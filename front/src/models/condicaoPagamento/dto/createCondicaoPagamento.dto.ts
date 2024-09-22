import { CondicaoPagamento } from "../entity/CondicaoPagamento";

export interface CreateCondicaoPagamentoDto {
  condicaoPagamento: string;
  juros: string;
  multa: string;
  desconto: string;

  quantidadeParcelas: number;
  parcelas: {
    numeroParcela: number;
    dias: number;
    porcentagem: string;
    formaPag_id: number;
    formaPagamento: string;
  }[];
}

export function transformarParaPostCondicaoPagamento(
  data: CondicaoPagamento
): CreateCondicaoPagamentoDto {
  return {
    condicaoPagamento: data.condicaoPagamento,
    quantidadeParcelas: data.quantidadeParcelas,
    juros: data.juros,
    multa: data.multa,
    desconto: data.desconto,
    parcelas: data.parcelas,
  };
}
