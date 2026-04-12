export interface PecaCategory {
  title: string;
  items: {
    icon: any;
    label: string;
    pathname: string;
  }[];
}

export interface CreateDocumento {
  titulo: string;
  tipo: string;
  descricao: string;
  arquivo: File | null;
}

export interface UploadDocumento {
  titulo: string;
  tipo: string;
  descricao: string;
  arquivo: File | null;
  url: string;
}
