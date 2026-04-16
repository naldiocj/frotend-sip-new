import { AutoDeclaracaoTemplate } from "@/components/templates/auto-declaracao";

export function switchTemplate(type: string) {
  switch (type) {
    case "AUTO_DECLARACAO":
      return AutoDeclaracaoTemplate;
    case "AUTO_DECLARACAO_EM_ADITAMENTO":
      return AutoDeclaracaoTemplate;
    default:
      throw new Error(`Template not found for type: ${type}`);
  }
}
