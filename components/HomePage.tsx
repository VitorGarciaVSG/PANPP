import React from 'react';

const HomePage: React.FC = () => {
  const categories = [
    { id: 1, name: 'Futebol', icon: '⚽' },
    { id: 2, name: 'Ping Pong', icon: '🏓' },
    { id: 3, name: 'Dominó', icon: '🎲' },
    { id: 4, name: 'Volei', icon: '🏐' },
    { id: 5, name: 'Dama', icon: '♟️' },
    { id: 6, name: 'Xadrez', icon: '♞' },
    { id: 7, name: 'Sinuca', icon: '🎱' },
    { id: 8, name: 'Truco', icon: '🃏' },
  ];

  const dates = [
    { phase: 'FIM DAS INSCRIÇÕES', date: '25/08/2026', status: 'ativo', color: 'bg-green-100 border-green-500' },
    { phase: 'CLASSIFICATÓRIAS', date: '11/09/2026', status: 'futuro', color: 'bg-yellow-100 border-yellow-500' },
    { phase: 'CLASSIFICATÓRIAS', date: '18/09/2026', status: 'futuro', color: 'bg-yellow-100 border-yellow-500' },
    { phase: 'FINAL - ENTREGA DE MEDALHAS E CHURRASCO', date: '25/09/2026', status: 'futuro', color: 'bg-blue-100 border-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-400 text-blue-900 rounded-full px-6 py-2 mb-4 font-bold text-sm">
              🏆 EVENTO DESPORTIVO 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              EVENTO DESPORTIVO
            </h1>
            <p className="text-xl text-blue-200 mb-2">
              No Clube CAESB
            </p>
            <div className="h-1 w-32 bg-green-400 mx-auto mt-4"></div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-8 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold mb-4">📅 Cronograma</h2>
              <div className="space-y-3">
                {dates.map((item, idx) => (
                  <div key={idx} className={`p-4 rounded border-l-4 ${item.color}`}>
                    <p className="font-bold text-gray-800">{item.phase}</p>
                    <p className="text-gray-600 text-sm">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-8 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold mb-4">ℹ️ Informações</h2>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span><strong>Inscrições limitadas:</strong> 25 de agosto de 2026</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span><strong>8 categorias:</strong> Futebol, Ping Pong, Dominó, Volei, Dama, Xadrez, Sinuca e Truco</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span><strong>Premiação:</strong> Medalhas e Churrasco para os vencedores</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span><strong>Local:</strong> Clube CAESB</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-center mb-12">
              🎮 Categorias do Evento
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-6 text-center hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
                >
                  <div className="text-5xl mb-2">{cat.icon}</div>
                  <h3 className="font-bold text-blue-900 text-sm md:text-base">{cat.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-green-500 rounded-lg p-8 text-center hover:bg-green-600 transition cursor-pointer">
            <h3 className="text-2xl font-bold text-white mb-2">🎯 Pronto para participar?</h3>
            <p className="text-green-100 mb-4">Faça sua inscrição agora e garanta sua vaga no evento!</p>
            <p className="text-sm text-green-200">Inscrições abertas até 25 de agosto de 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
