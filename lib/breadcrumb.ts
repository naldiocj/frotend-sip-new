import { ROLES } from "./constants";
import { INSTRUTOR_PATHS } from "./path";
import { replaceChar, toUrl } from "./utils-func";

type UserRole = "INSTRUTOR";

export function getPagename(url: string, role: string) {
  const id = url.split("/")[3];

  const replacedId = replaceChar(id, "-", "/");

  if (role === ROLES.INSTRUTOR) {
    switch (url) {
      case "":
      case "/":
      case "/dashboard":
        return "Painel de controlo";
      case INSTRUTOR_PATHS.PROCESSOS:
        return "Processos";

      case INSTRUTOR_PATHS.PROCESSOS:
        return "Processos";

      case `${INSTRUTOR_PATHS.PROCESSOS}/${id}`:
        return `Processo nº ${replacedId}`;

      case `${toUrl(INSTRUTOR_PATHS.PROCESSOS_RESUMO, id)}`:
        return `Resumo -> Processo nº ${replacedId} `;

      case `${toUrl(INSTRUTOR_PATHS.PROCESSOS_DILIGENCIAS, id)}`:
        return `Diligências -> Processo nº ${replacedId} `;
    }
  }
}
