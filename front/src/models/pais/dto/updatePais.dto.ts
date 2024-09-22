import { Pais } from "../entity/Pais";

export interface UpdatePaisDto {
  id: number;
  pais: string;
  sigla: string;
  ddi: string;
  ativo: boolean;
}

export function transformarParaPutPais(data: Pais): UpdatePaisDto {
  return {
    id: data.id,
    pais: data.pais,
    sigla: data.sigla,
    ddi: data.ddi,
    ativo: data.ativo,
  };
}
