export interface PecaCategory {
  title: string;
  items: {
    icon: any;
    label: string;
    url: string;
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

// DTOs
export interface CreateAutoDeclaracaoDTO {
  numeroFolha: string;
  dataEmissao: string;
  descricao: string;
  endereco: string;
  processo: { id: string; numero: string };
  tipoDeclaracao: "INICIAL" | "ADITAMENTO";
  materiaAutos: string;
}
