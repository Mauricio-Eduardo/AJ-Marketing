import { Cidade } from "../entity/Cidade";

export interface CreateCidadeDto {
  cidade: string;
  ddd: string;
  estado_id: number;
}

export function transformarParaPostCidade(data: Cidade): CreateCidadeDto {
  return {
    cidade: data.cidade,
    ddd: data.ddd,
    estado_id: data.estado_id,
  };
}
