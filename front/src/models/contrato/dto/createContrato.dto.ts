import { Contrato } from "../entity/Contrato";

export interface CreateContratoDto {
  cliente_id: number;
  proposta_id: number;
  data_vencimento: string;
}

export function transformarParaPostContrato(data: Contrato): CreateContratoDto {
  return {
    cliente_id: data.cliente_id,
    proposta_id: data.proposta_id,
    data_vencimento: data.data_vencimento,
  };
}
