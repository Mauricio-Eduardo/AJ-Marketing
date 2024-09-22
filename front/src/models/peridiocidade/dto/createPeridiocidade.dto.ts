import { Peridiocidade } from "../entity/Peridiocidade";

export interface CreatePeridiocidadeDto {
  descricao: string;
  dias: number;
}

export function transformarParaPostPeridiocidade(
  data: Peridiocidade
): CreatePeridiocidadeDto {
  return {
    descricao: data.descricao,
    dias: data.dias,
  };
}
