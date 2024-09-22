import { Cidade } from "../entity/Cidade";

export interface UpdateCidadeDto {
  id: number;
  cidade: string;
  ddd: string;
  estado_id: number;
  ativo: boolean;
}

export function transformarParaPutCidade(data: Cidade): UpdateCidadeDto {
  return {
    id: data.id,
    cidade: data.cidade,
    ddd: data.ddd,
    estado_id: data.estado_id,
    ativo: data.ativo,
  };
}
