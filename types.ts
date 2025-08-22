
export interface Equipment {
  id: string;
  nome: string;
  imagem: string;
}

export interface TeamAssetMap {
  [key: string]: string;
}

export interface StatusMap {
  [key: string]: 'Presente' | 'Ausente';
}

export interface Photo {
  id: number;
  url: string;
  file: File;
}
