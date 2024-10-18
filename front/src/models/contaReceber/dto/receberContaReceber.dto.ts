import { ContaReceber } from "../entity/ContaReceber";

export interface ReceberContaReceberDto {
  contaReceber_id: number;
  formaPag_id: number;
  recebido: string;
  juros: string;
  multa: string;
  desconto: string;
  total: string;
  receber: string;
  data_recebimento: string;
}

export function transformarParaReceberContaReceber(
  id: number,
  pReceber: string,
  data: ContaReceber
): ReceberContaReceberDto {
  const { formaPagamento, ...ultimoRecebimento } =
    data.recebimentos[data.recebimentos.length - 1];

  const recebimento = {
    contaReceber_id: id,
    receber: pReceber,
    ...ultimoRecebimento,
  };
  return recebimento;
}
