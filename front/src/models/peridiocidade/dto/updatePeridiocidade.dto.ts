import { Peridiocidade } from "../entity/Peridiocidade";

export interface UpdatePeridiocidadeDto {
  id: number;
  descricao: string;
  dias: number;
  ativo: boolean;
}

export function transformarParaPutPeridiocidade(
  data: Peridiocidade
): UpdatePeridiocidadeDto {
  return {
    id: data.id,
    descricao: data.descricao,
    dias: data.dias,
    ativo: data.ativo,
  };
}
