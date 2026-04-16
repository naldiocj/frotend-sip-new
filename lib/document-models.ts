// constants/documentModels.ts
export const DOCUMENT_MODELS = {
  AUTO_DECLARACAO: {
    title: "Auto de Declaração",
    fields: [
      {
        name: "processoNumero",
        label: "Número do Processo",
        type: "text",
        placeholder: "Ex: 123/2023",
        value: "",
      },
      {
        name: "tipoDeclaracao",
        label: "Tipo de Declaração",
        type: "text",
        placeholder: "Ex: Aditamento",
        value: "INICIAL",
      },
      {
        name: "numeroFolha",
        label: "Nº da Folha",
        type: "text",
        placeholder: "Ex: 1",
        value: "",
      },
      {
        name: "materiaAutos",
        label: "Matéria dos Autos",
        type: "textarea",
        placeholder: "",
        value: "",
      },
      {
        name: "endereco",
        label: "Endereço",
        type: "text",
        placeholder: "",
        value: "",
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
        placeholder: "",
        value: "",
      },
    ],
  },
  AUTO_DECLARACAO_EM_ADITAMENTO: {
    title: "Auto de Declaração em Aditamento",
    fields: [
      {
        name: "processoNumero",
        label: "Número do Processo",
        type: "text",
        placeholder: "Ex: 123/2023",
        value: "",
      },
      {
        name: "tipoDeclaracao",
        label: "Tipo de Declaração",
        type: "text",
        placeholder: "Ex: Aditamento",
        value: "INICIAL",
      },
      {
        name: "numeroFolha",
        label: "Nº da Folha",
        type: "text",
        placeholder: "Ex: 1",
        value: "",
      },
      {
        name: "materiaAutos",
        label: "Matéria dos Autos",
        type: "textarea",
        placeholder: "",
        value: "",
      },
      {
        name: "endereco",
        label: "Endereço",
        type: "text",
        placeholder: "",
        value: "",
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
        placeholder: "",
        value: "",
      },
    ],
  },
  AUTO_APREENSAO: {
    title: "Auto de Apreensão",
    fields: [
      {
        name: "local",
        label: "Local da Apreensão",
        type: "text",
        placeholder: "Ex: Via Pública",
        value: "",
      },
      {
        name: "item",
        label: "Objeto Apreendido",
        type: "text",
        placeholder: "Ex: Veículo",
        value: "",
      },
      {
        name: "quantidade",
        label: "Quantidade",
        type: "number",
        placeholder: "Ex: 1",
        value: "",
      },
    ],
  },
} as const;
