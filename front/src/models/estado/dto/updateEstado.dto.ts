import { Estado } from "../entity/Estado";

export interface UpdateEstadoDto {
  id: number;
  estado: string;
  uf: string;
  pais_id: number;
  ativo: boolean;
}

export function transformarParaPutEstado(data: Estado): UpdateEstadoDto {
  return {
    id: data.id,
    estado: data.estado,
    uf: data.uf.toUpperCase(),
    pais_id: data.pais_id,
    ativo: data.ativo,
  };
}
