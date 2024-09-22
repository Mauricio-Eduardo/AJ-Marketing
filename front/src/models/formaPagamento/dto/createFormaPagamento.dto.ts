import { FormaPagamento } from "../entity/FormaPagamento";

export interface CreateFormaPagamentoDto {
  formaPagamento: string;
}

export function transformarParaPostFormaPagamento(
  data: FormaPagamento
): CreateFormaPagamentoDto {
  return {
    formaPagamento: data.formaPagamento,
  };
}
