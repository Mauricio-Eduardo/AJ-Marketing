import { CondicaoPagamento } from "../entity/CondicaoPagamento";

export interface UpdateCondicaoPagamentoDto {
  id: number;
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

  ativo: boolean;
}

export function transformarParaPutCondicaoPagamento(
  data: CondicaoPagamento
): UpdateCondicaoPagamentoDto {
  return {
    id: data.id,
    condicaoPagamento: data.condicaoPagamento,
    quantidadeParcelas: data.quantidadeParcelas,
    juros: data.juros,
    multa: data.multa,
    desconto: data.desconto,
    parcelas: data.parcelas,
    ativo: data.ativo,
  };
}
