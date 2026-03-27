/**
 * Utilitários para manipulação de dados do SIP
 * Funções auxiliares para conversão, formatação e validação de dados
 */

/**
 * Formata um número de processo para padrão XX/YYYY
 */
export function formatarNumeroProcesso(numero: string): string {
  const cleaned = numero.replace(/\D/g, "");
  if (cleaned.length < 4) return numero;
  const parte1 = cleaned.slice(-4, -2);
  const parte2 = cleaned.slice(-2);
  return `${parte1}/${parte2}`;
}

/**
 * Formata um BI/CI para padrão
 */
export function formatarBI(bi: string): string {
  return bi.toUpperCase().trim();
}

/**
 * Valida email
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida telefone
 */
export function validarTelefone(telefone: string): boolean {
  const cleaned = telefone.replace(/\D/g, "");
  return cleaned.length >= 9;
}

/**
 * Formata número de telefone
 */
export function formatarTelefone(telefone: string): string {
  const cleaned = telefone.replace(/\D/g, "");
  if (cleaned.length === 9) return `+244${cleaned}`;
  return telefone;
}

/**
 * Calcula idade baseado em data de nascimento
 */
export function calcularIdade(dataNascimento: Date): number {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = dataNascimento.getMonth();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())
  ) {
    idade--;
  }

  return idade;
}

/**
 * Formata data para DD/MM/YYYY
 */
export function formatarData(data: Date): string {
  return data.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function convertData(data: string): string {
  return new Date().toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formata data e hora completa
 */
export function formatarDataHora(data: Date): string {
  return data.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Capitaliza primeira letra de string
 */
export function capitalizarPrimeira(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Converte string para Title Case
 */
export function paraCapitalizada(texto: string): string {
  return texto
    .split(" ")
    .map((palavra) => capitalizarPrimeira(palavra))
    .join(" ");
}

/**
 * Gera um ID único
 */
export function gerarID(): number {
  return Math.floor(Math.random() * 1000000) + 1;
}

/**
 * Valida se é maior de idade
 */
export function ehMaiorDeIdade(dataNascimento: Date): boolean {
  return calcularIdade(dataNascimento) >= 18;
}

/**
 * Formata estado civil para exibição
 */
export function formatarEstadoCivil(estado: string): string {
  const estados: { [key: string]: string } = {
    solteiro: "Solteiro(a)",
    casado: "Casado(a)",
    divorciado: "Divorciado(a)",
    viuvo: "Viúvo(a)",
    uniao_facto: "União de Fato",
  };
  return estados[estado.toLowerCase()] || estado;
}

/**
 * Formata qualidade jurídica
 */
export function formatarQualidade(qualidade: string): string {
  const qualidades: { [key: string]: string } = {
    queixoso: "Queixoso",
    testemunha: "Testemunha",
    arguido: "Arguido",
    defensor: "Defensor",
    acusador: "Acusador",
  };
  return qualidades[qualidade.toLowerCase()] || qualidade;
}

/**
 * Obtém iniciais de um nome
 */
export function obterIniciais(nome: string): string {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((palavra) => palavra.charAt(0).toUpperCase())
    .join("");
}

/**
 * Comparar duas datas
 */
export function compararDatas(data1: Date, data2: Date): number {
  return data1.getTime() - data2.getTime();
}

/**
 * Verifica se data é no passado
 */
export function ehNoPastado(data: Date): boolean {
  return compararDatas(data, new Date()) < 0;
}

/**
 * Formata duração entre datas
 */
export function formatarDuracao(inicio: Date, fim: Date): string {
  const diffMs = fim.getTime() - inicio.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias === 0) return "Hoje";
  if (diffDias === 1) return "1 dia";
  if (diffDias < 30) return `${diffDias} dias`;
  if (diffDias < 365) return `${Math.floor(diffDias / 30)} meses`;
  return `${Math.floor(diffDias / 365)} ano(s)`;
}

/**
 * Ordena array de pessoas por nome
 */
export function ordenarPessoasPorNome<T extends { nome: string }>(
  pessoas: T[],
): T[] {
  return [...pessoas].sort((a, b) => a.nome.localeCompare(b.nome));
}

/**
 * Filtra pessoas por critério
 */
export function filtrarPessoas<T extends { nome: string; numeroBi?: string }>(
  pessoas: T[],
  termo: string,
): T[] {
  const termoLower = termo.toLowerCase();
  return pessoas.filter(
    (p) =>
      p.nome.toLowerCase().includes(termoLower) ||
      (p.numeroBi && p.numeroBi.toLowerCase().includes(termoLower)),
  );
}

/**
 * Agrupa pessoas por estado civil
 */
export function agruparPorEstadoCivil<
  T extends { estadoCivil?: string; nome: string },
>(pessoas: T[]): { [key: string]: T[] } {
  return pessoas.reduce(
    (acc, pessoa) => {
      const estado = pessoa.estadoCivil || "Não Especificado";
      if (!acc[estado]) {
        acc[estado] = [];
      }
      acc[estado].push(pessoa);
      return acc;
    },
    {} as { [key: string]: T[] },
  );
}

/**
 * Gera estatísticas básicas de array de pessoas
 */
export function gerarEstatisticasPessoas<
  T extends { idade?: number; dataNascimento?: Date },
>(
  pessoas: T[],
): {
  total: number;
  idadeMedia: number;
  idadeMinima?: number;
  idadeMaxima?: number;
} {
  const comIdade = pessoas.filter(
    (p) => p.idade !== undefined && p.idade !== null,
  );
  const idades = comIdade.map((p) => p.idade as number);

  return {
    total: pessoas.length,
    idadeMedia:
      idades.length > 0
        ? Math.floor(idades.reduce((a, b) => a + b, 0) / idades.length)
        : 0,
    idadeMinima: idades.length > 0 ? Math.min(...idades) : undefined,
    idadeMaxima: idades.length > 0 ? Math.max(...idades) : undefined,
  };
}

/**
 * Exporta array para CSV
 */
export function exportarParaCSV<T extends Record<string, any>>(
  dados: T[],
  nome_arquivo: string,
): void {
  if (dados.length === 0) return;

  const headers = Object.keys(dados[0]);
  const csv = [
    headers.join(","),
    ...dados.map((linha) =>
      headers
        .map((header) => {
          const valor = linha[header];
          if (valor === null || valor === undefined) return "";
          if (typeof valor === "string" && valor.includes(","))
            return `"${valor}"`;
          if (valor instanceof Date) return formatarData(valor);
          return valor;
        })
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${nome_arquivo}-${new Date().getTime()}.csv`;
  a.click();
}

/**
 * Plural simples
 */
export function pluralizar(palavra: string, quantidade: number): string {
  return quantidade === 1 ? palavra : `${palavra}s`;
}

/**
 * Formata número em português
 */
export function formatarNumero(numero: number, decimais: number = 0): string {
  return numero.toLocaleString("pt-PT", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  });
}

/**
 * Calcula percentagem
 */
export function calcularPercentagem(parte: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((parte / total) * 100);
}

export function convertEstadoProcessoToNormalCase(
  estadoProcesso: string | null,
) {
  switch (estadoProcesso) {
    case "EM_INSTRUCAO":
      return "Em instrução";
    case "ARQUIVADO":
      return "Arquivado";
    case "REMETIDO_JUIZO":
      return "Remetido a juízo";
    case "REMETIDO_PGR":
      return "Remetido à PGR";
    case "TRAMITADO":
      return "Tramitado";
    case "SENTENCIADO":
      return "Sentenciado";
    default:
      return null;
  }
}

export function toUpperCase(text: string | null) {
  if (text === null) return null;
  return text.toUpperCase();
}

export function getBageEstadoProcesso(value: string | null) {
  if (!value) return null;
  return value === "EM_INSTRUCAO"
    ? "default"
    : value === "ARQUIVADO"
      ? "secondary"
      : value === "REMETIDO_JUIZO"
        ? "secondary"
        : value === "REMETIDO_PGR"
          ? "default"
          : value === "TRAMITADO"
            ? "link"
            : value === "SENTENCIADO"
              ? "destructive"
              : "outline";
}
