import { Pais } from "../entity/Pais";

export interface CreatePaisDto {
  pais: string;
  sigla: string;
  ddi: string;
}

export function transformarParaPostPais(data: Pais): CreatePaisDto {
  return {
    pais: data.pais,
    sigla: data.sigla,
    ddi: data.ddi,
  };
}
