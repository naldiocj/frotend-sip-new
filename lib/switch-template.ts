import { AutoAcareacaoTemplate } from "@/components/templates/autos/auto-acareacao";
import { AutoConstituicaoArguidoTemplate } from "@/components/templates/autos/auto-constituicao-de-arguido";
import { AutoCorpoDelitoIndirectoTemplate } from "@/components/templates/autos/auto-corpo-de-delito-indirecto";
import { AutoDepoimentoIndirectoTemplate } from "@/components/templates/autos/auto-de-depoimento-indirecto";
import { AutoDeclaracaoEmAditamentoTemplate } from "@/components/templates/autos/auto-declaracao-em-aditamento-template";
import { AutoDeclaracaoTemplate } from "@/components/templates/autos/auto-declaracao-template";
import { AutoDepoimentoDirectoTemplate } from "@/components/templates/autos/auto-depoimento-directo-template";
import { AutoDiligenciaTemplate } from "@/components/templates/autos/auto-diligencia-template";
import { AutoExameDirectoTemplate } from "@/components/templates/autos/auto-exame-directo";
import { AutoExameAvaliacaoTemplate } from "@/components/templates/autos/auto-exame-directo-avaliacao";
import { AutoInterrogatorioArguidoTemplate } from "@/components/templates/autos/auto-interrogatorio-arguido-template";
import { AutoQueixaTemplate } from "@/components/templates/autos/auto-queixa-template";
import { AutoReconhecimentoFisicoEDirectoObjectoTemplate } from "@/components/templates/autos/auto-reconhecimento-fisico-e-directo-objecto";
import { AutoReconhecimentoFisicoEDirectoPessoaTemplate } from "@/components/templates/autos/auto-reconhecimento-fisico-e-directo-pessoa";
import { AutoReconstituicaoTemplate } from "@/components/templates/autos/auto-reconstituicao";
import { CotaTemplate } from "@/components/templates/autos/cota";
import { CapaCartaPrecatoriaTemplate } from "@/components/templates/capas/capa-carta-precatoria";
import { CapaProcessoCrimeTemplate } from "@/components/templates/capas/capa-processo-crime";

export function switchTemplate(type: string) {
  switch (type) {
    case "AUTO_DECLARACAO":
      return AutoDeclaracaoTemplate;
    case "AUTO_DECLARACAO_EM_ADITAMENTO":
      return AutoDeclaracaoEmAditamentoTemplate;
    case "AUTO_DEPOIMENTO_DIRECTO":
      return AutoDepoimentoDirectoTemplate;
    case "AUTO_DILIGENCIA":
      return AutoDiligenciaTemplate;
    case "AUTO_QUEIXA":
      return AutoQueixaTemplate;
    case "AUTO_CONSTITUICAO_DE_ARGUIDO":
      return AutoConstituicaoArguidoTemplate;
    case "AUTO_INTERROGATORIO":
      return AutoInterrogatorioArguidoTemplate;
    case "AUTO_RECONHECIMENTO_FISICO_E_DIRECTO_DE_OBJS":
      return AutoReconhecimentoFisicoEDirectoObjectoTemplate;
    case "AUTO_RECONHECIMENTO_FISICO_E_DIRECTO_DE_PESSOAS":
      return AutoReconhecimentoFisicoEDirectoPessoaTemplate;
    case "AUTO_BUSCA_E_APREENSAO":
      return AutoReconhecimentoFisicoEDirectoPessoaTemplate; // TODO
    case "AUTO_DEPOIMENTO_INDIRECTO":
      return AutoDepoimentoIndirectoTemplate;
    case "AUTO_EXAME_DIRECTO":
      return AutoExameDirectoTemplate;
    case "AUTO_EXAME_DIRECTO_E_AVALIACAO":
      return AutoExameAvaliacaoTemplate;
    case "AUTO_RECONSTITUICAO":
      return AutoReconstituicaoTemplate;
    case "AUTO_CORPO_DE_DELITO_INDIRETO":
      return AutoCorpoDelitoIndirectoTemplate;
    case "AUTO_ACARECACAO":
      return AutoAcareacaoTemplate;

    // Cota
    case "COTA":
      return CotaTemplate;

    // Capas
    case "CAPA_PROCESSO":
      return CapaProcessoCrimeTemplate;
    case "CAPA_CARTA_PRECATORIA":
      return CapaCartaPrecatoriaTemplate;
    default:
      throw new Error(`Template not found for type: ${type}`);
  }
}
