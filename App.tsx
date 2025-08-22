
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { equipamentos, teamAssetMap } from './constants';
import type { StatusMap, Photo } from './types';
import ErrorMessage from './components/ErrorMessage';

declare const html2canvas: any;
declare const jspdf: any;

const App: React.FC = () => {
  // --- State ---
  const [reportDate, setReportDate] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [assetNumber, setAssetNumber] = useState('');
  const [statuses, setStatuses] = useState<StatusMap>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const signaturePadRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  // --- Effects ---
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setReportDate(today);
  }, []);

  useEffect(() => {
    setAssetNumber(teamAssetMap[teamMember] || '');
  }, [teamMember]);
  
  const getPosition = useCallback((event: MouseEvent | TouchEvent) => {
    const canvas = signaturePadRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if (event instanceof TouchEvent && event.touches.length > 0) {
        return { x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top };
    }
    if (event instanceof MouseEvent) {
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    return { x: 0, y: 0 };
  }, []);

  const startDrawing = useCallback((event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    const canvas = signaturePadRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPosition(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    drawing.current = true;
  }, [getPosition]);

  const draw = useCallback((event: MouseEvent | TouchEvent) => {
    if (!drawing.current) return;
    event.preventDefault();
    const canvas = signaturePadRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPosition(event);
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [getPosition]);

  const stopDrawing = useCallback(() => {
    drawing.current = false;
  }, []);

  useEffect(() => {
    const canvas = signaturePadRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        ctx.scale(ratio, ratio);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    
    return () => {
        window.removeEventListener('resize', resizeCanvas);
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseleave', stopDrawing);
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);

  // --- Handlers ---
  const handleStatusChange = (id: string, value: 'Presente' | 'Ausente') => {
    setStatuses(prev => ({ ...prev, [id]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    const newPhotos: Photo[] = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file: file
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
    event.target.value = ''; // Reset input
  };

  const removePhoto = (id: number) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };
  
  const clearSignature = () => {
    const canvas = signaturePadRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const isCanvasBlank = () => {
    const canvas = signaturePadRef.current;
    if (!canvas) return true;
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() === blank.toDataURL();
  };

  const generatePDFReport = async () => {
    const currentErrors: string[] = [];
    if (!teamMember) currentErrors.push('O campo "Equipe" é obrigatório.');
    if (!assetNumber) currentErrors.push('O campo "Patrimônio" é obrigatório.');
    if (isCanvasBlank()) currentErrors.push('A "Assinatura" é obrigatória.');
    if (photos.length === 0) currentErrors.push('É obrigatório adicionar pelo menos uma foto geral do kit.');
    const missingStatusItems = equipamentos.filter(e => !statuses[e.id]).map(e => e.nome);
    if (missingStatusItems.length > 0) {
      currentErrors.push(`É obrigatório marcar o status para: ${missingStatusItems.join(', ')}.`);
    }
    
    setErrors(currentErrors);
    if (currentErrors.length > 0) return;
    
    setIsLoading(true);

    try {
      const { jsPDF } = jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');
      const reportContainer = document.getElementById('report-container');
      if (!reportContainer || !signaturePadRef.current) return;

      const formattedDate = reportDate ? new Date(reportDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'Não preenchida';
      const signatureDataUrl = signaturePadRef.current.toDataURL();

      let statusHTML = equipamentos.map(equip => {
          const statusValue = statuses[equip.id] || 'Não marcado';
          let statusColor = statusValue === 'Presente' ? '#16a34a' : '#dc2626';
          return `
              <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6;">
                  <p style="margin: 0; color: #374151;">${equip.nome}</p>
                  <p style="margin: 0; font-weight: 600; color: ${statusColor};">${statusValue}</p>
              </div>`;
      }).join('');

      const reportHTML = `
          <div style="background-color: #ffffff;">
              <header style="background-color: #0d4475; color: white; padding: 2rem; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                      <p style="font-size: 0.875rem; font-weight: 600; color: #a3bde3; letter-spacing: 0.05em;">CHECKLIST DE EQUIPAMENTOS</p>
                      <h1 style="font-size: 2.5rem; font-weight: 800; color: #ffffff; margin: 0;">KIT TOPOGRAFIA</h1>
                      <p style="font-size: 1rem; color: #d1e0f7; margin: 0.25rem 0 0;">PANPP</p>
                  </div>
                  <img src="https://s3.caesb.df.gov.br/www/prod/site1/2024/06/LOGO-CAESB-BRANCA-COMPLETA.png" style="height: 64px;" crossorigin="anonymous">
              </header>
              <div style="padding: 2rem;">
                  <section style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;">
                      <div><p style="margin: 0; font-size: 0.8rem; color: #6b7280; font-weight: 500;">DATA</p><p style="margin: 0.25rem 0 0; font-size: 1.1rem; font-weight: 600;">${formattedDate}</p></div>
                      <div><p style="margin: 0; font-size: 0.8rem; color: #6b7280; font-weight: 500;">EQUIPE</p><p style="margin: 0.25rem 0 0; font-size: 1.1rem; font-weight: 600;">${teamMember}</p></div>
                      <div><p style="margin: 0; font-size: 0.8rem; color: #6b7280; font-weight: 500;">PATRIMÔNIO</p><p style="margin: 0.25rem 0 0; font-size: 1.1rem; font-weight: 600;">${assetNumber}</p></div>
                  </section>
                  <h3 style="font-size: 1.1rem; font-weight: 600; color: #1f2937; margin-top: 2rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Status dos Equipamentos</h3>
                  ${statusHTML}
                  <div style="margin-top: 2.5rem; padding: 1rem; border: 1px solid #e5e7eb; background-color: #f9fafb; border-radius: 8px; font-size: 0.8rem; color: #4b5563;">
                      <p style="font-weight: bold; margin: 0 0 0.5rem 0; color: #1f2937;">Termo de Responsabilidade</p>
                      <p style="margin: 0;">Declaro estar ciente de que todos os equipamentos e informações descritos neste documento são de minha inteira responsabilidade, assumindo o compromisso de zelar por sua integridade e segurança.</p>
                  </div>
                  <footer style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; text-align: center;">
                      <h3 style="font-weight: 600; font-size: 0.9rem; color: #4b5563;">ASSINATURA OFICIAL RESPONSÁVEL</h3>
                      <img src="${signatureDataUrl}" style="width: 250px; height: 125px; margin: 8px auto 0; border: 1px solid #d1d5db; background-color: #f9fafb; border-radius: 4px;">
                  </footer>
              </div>
          </div>`;
      
      reportContainer.innerHTML = reportHTML;
      const canvasPage1 = await html2canvas(reportContainer, { scale: 2, useCORS: true });
      const imgDataPage1 = canvasPage1.toDataURL('image/png');
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvasPage1.height * pdfWidth) / canvasPage1.width;
      doc.addImage(imgDataPage1, 'PNG', 0, 0, pdfWidth, pdfHeight);

      for (let i = 0; i < photos.length; i++) {
          doc.addPage();
          doc.setFontSize(16); doc.setTextColor(31, 41, 55);
          doc.text(`Anexo: Foto Geral ${i + 1}`, 15, 20);
          const photoImg = new Image();
          photoImg.src = photos[i].url;
          await new Promise(resolve => photoImg.onload = resolve);
          const imgProps = doc.getImageProperties(photoImg);
          const imgWidth = 180;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
          const yPos = (doc.internal.pageSize.getHeight() - imgHeight) / 2;
          doc.addImage(photoImg, 'JPEG', 15, yPos > 30 ? yPos : 30, imgWidth, imgHeight);
      }

      doc.save('relatorio-checklist.pdf');

    } catch (err) {
      console.error("Erro ao gerar o PDF:", err);
      setErrors(["Ocorreu um erro inesperado ao gerar o relatório. Verifique o console para mais detalhes."]);
    } finally {
      setIsLoading(false);
      const reportContainer = document.getElementById('report-container');
      if (reportContainer) reportContainer.innerHTML = '';
    }
  };

  return (
    <>
      {isLoading && <div id="loader" className="loader" style={{display: 'block'}}></div>}
      
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div id="checklist-form" className="bg-white shadow-lg rounded-xl overflow-hidden">
          <header className="p-6 flex flex-col sm:flex-row justify-between items-center bg-blue-900 text-white rounded-t-xl text-center sm:text-left">
            <div className="order-2 sm:order-1">
                <p className="text-sm font-semibold text-blue-200">CHECKLIST</p>
                <h1 className="text-3xl sm:text-4xl font-bold">KIT TOPOGRAFIA</h1>
                <p className="text-md text-blue-300 mt-1">PANPP</p>
            </div>
            <img src="https://s3.caesb.df.gov.br/www/prod/site1/2024/06/LOGO-CAESB-BRANCA-COMPLETA.png" alt="Logo CAESB" className="h-12 sm:h-16 order-1 sm:order-2 mb-4 sm:mb-0" />
          </header>

          <section className="p-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                      <label htmlFor="report-date" className="block text-sm font-medium text-gray-700">Data</label>
                      <input type="date" id="report-date" value={reportDate} onChange={e => setReportDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50" />
                  </div>
                  <div>
                      <label htmlFor="team-member" className="block text-sm font-medium text-gray-700">Equipe <span className="text-red-500">*</span></label>
                      <select id="team-member" value={teamMember} onChange={e => setTeamMember(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                          <option value="">Selecione a equipe</option>
                          {Object.keys(teamAssetMap).map(team => <option key={team} value={team}>{team}</option>)}
                      </select>
                  </div>
                  <div>
                      <label htmlFor="asset-number" className="block text-sm font-medium text-gray-700">Coletora RTK - patrimonio <span className="text-red-500">*</span></label>
                      <select id="asset-number" value={assetNumber} onChange={e => setAssetNumber(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                          <option value="">Selecione um patrimônio</option>
                          {['80803', '80804', '80805', '80806'].map(num => <option key={num} value={num}>{num}</option>)}
                      </select>
                  </div>
              </div>
          </section>

          <main className="p-6 border-t border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-700 mb-4 px-4 py-2 bg-gray-100 rounded-md">EQUIPAMENTOS DE REFERÊNCIA</h2>
            <div id="equipment-list" className="flex flex-col">
              {equipamentos.map(equip => (
                <div key={equip.id} className="border-b border-gray-200 p-4 flex flex-col sm:flex-row items-center gap-6">
                    <img src={equip.imagem} alt={`Imagem de ${equip.nome}`} className="w-24 h-24 sm:w-32 sm:h-32 object-contain flex-shrink-0" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).src='https://placehold.co/150x150/EFEFEF/333?text=Imagem+N/A'; }} />
                    <div className="flex-1 text-center sm:text-left w-full">
                        <h3 className="text-xl font-bold text-gray-800">{equip.nome}</h3>
                        <div className="mt-3 flex justify-center sm:justify-start gap-4">
                            <label className="status-label presente flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-gray-300">
                                <input type="radio" name={`status-${equip.id}`} value="Presente" checked={statuses[equip.id] === 'Presente'} onChange={() => handleStatusChange(equip.id, 'Presente')} className="form-radio h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"/>
                                <span>Presente</span>
                            </label>
                            <label className="status-label ausente flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-gray-300">
                                <input type="radio" name={`status-${equip.id}`} value="Ausente" checked={statuses[equip.id] === 'Ausente'} onChange={() => handleStatusChange(equip.id, 'Ausente')} className="form-radio h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"/>
                                <span>Ausente</span>
                            </label>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </main>

          <section className="p-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-700 mb-4">FOTOS GERAIS DO KIT <span className="text-red-500">*</span></h2>
            <div className="flex flex-col items-center">
              <input type="file" id="photo-upload-input" multiple accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload}/>
              <button onClick={() => document.getElementById('photo-upload-input')?.click()} className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors shadow-md w-full max-w-xs">
                <i className="fas fa-camera mr-2"></i>Adicionar Fotos
              </button>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 w-full">
                {photos.map(photo => (
                  <div key={photo.id} className="relative w-full h-32 group">
                    <img src={photo.url} className="w-full h-full object-cover rounded-lg shadow-md" alt="Preview"/>
                    <button onClick={() => removePhoto(photo.id)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="p-6 border-t border-gray-200">
              <div className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 rounded-md" role="alert">
                  <p className="font-bold">Termo de Responsabilidade</p>
                  <p className="text-sm">Declaro estar ciente de que todos os equipamentos e informações descritos neste documento são de minha inteira responsabilidade, assumindo o compromisso de zelar por sua integridade e segurança.</p>
              </div>
          </section>

          <section className="p-6">
               <div className="mt-4">
                  <label className="block text-center font-semibold mb-2">ASSINATURA OFICIAL RESPONSÁVEL <span className="text-red-500">*</span></label>
                  <div className="flex flex-col items-center">
                      <canvas ref={signaturePadRef} id="signature-pad" className="border border-gray-400 rounded-md bg-gray-50 w-full max-w-md h-40"></canvas>
                      <button onClick={clearSignature} className="mt-2 bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm">
                          <i className="fas fa-eraser mr-1"></i> Limpar Assinatura
                      </button>
                  </div>
              </div>
          </section>

        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg flex flex-col items-center z-50">
          <div className="w-full mb-2"><ErrorMessage errorList={errors} /></div>
          <button onClick={generatePDFReport} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full">
              <i className="fas fa-file-pdf mr-2"></i>Gerar Relatório em PDF
          </button>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl hidden md:block">
          <div className="mt-8 pt-6 border-t border-gray-300 flex flex-col items-center gap-4">
              <div className="w-full"><ErrorMessage errorList={errors} /></div>
              <button onClick={generatePDFReport} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto">
                  <i className="fas fa-file-pdf mr-2"></i>Gerar Relatório em PDF
              </button>
              <p className="text-sm text-gray-500 text-center mt-2">
                  <strong>Instruções:</strong> 1. Preencha os campos. 2. Marque o status. 3. Adicione fotos. 4. Gere o PDF.
              </p>
          </div>
      </div>
    </>
  );
};

export default App;
