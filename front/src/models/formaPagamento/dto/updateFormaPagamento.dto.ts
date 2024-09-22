import { FormaPagamento } from "../entity/FormaPagamento";

export interface UpdateFormaPagamentoDto {
  id: number;
  formaPagamento: string;
  ativo: boolean;
}

export function transformarParaPutFormaPagamento(
  data: FormaPagamento
): UpdateFormaPagamentoDto {
  return {
    id: data.id,
    formaPagamento: data.formaPagamento,
    ativo: data.ativo,
  };
}
