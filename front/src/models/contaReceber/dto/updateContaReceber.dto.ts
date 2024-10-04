import { ContaReceber } from "../entity/ContaReceber";

export interface UpdateContaReceberDto {
  id: number;
  juros: string;
  multa: string;
  desconto: string;
  valor_pago: string;
  valor_aberto: string;
  data_vencimento: string;
  data_recebimento: string;
  situacao: string;
}

export function transformarParaPutContaReceber(
  data: ContaReceber
): UpdateContaReceberDto {
  return {
    id: data.id,
    juros: data.juros,
    multa: data.multa,
    desconto: data.desconto,
    valor_pago: data.valor_pago,
    valor_aberto: data.valor_aberto,
    data_vencimento: data.data_vencimento,
    data_recebimento: data.data_recebimento,
    situacao: data.situacao,
  };
}
