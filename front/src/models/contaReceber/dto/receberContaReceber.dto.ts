import { ContaReceber } from "../entity/ContaReceber";

export interface UpdateContaReceberDto {
  id: number;
  jurosRecebido: string;
  multaRecebida: string;
  descontoConcedido: string;
  totalRecebido: string;
  data_recebimento: string;
}

export function transformarParaPutContaReceber(
  data: ContaReceber
): UpdateContaReceberDto {
  return {
    id: data.id,
    jurosRecebido: data.jurosRecebido,
    multaRecebida: data.multaRecebida,
    descontoConcedido: data.descontoConcedido,
    totalRecebido: data.totalRecebido,
    data_recebimento: data.data_recebimento,
  };
}
