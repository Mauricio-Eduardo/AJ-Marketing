import { Estado } from "../entity/Estado";

export interface CreateEstadoDto {
  estado: string;
  uf: string;
  pais_id: number;
}

export function transformarParaPostEstado(data: Estado): CreateEstadoDto {
  return {
    estado: data.estado,
    uf: data.uf,
    pais_id: data.pais_id,
  };
}
