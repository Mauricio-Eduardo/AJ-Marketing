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
    juros: data.juros != "" ? data.juros : "0.00",
    multa: data.multa != "" ? data.multa : "0.00",
    desconto: data.desconto != "" ? data.desconto : "0.00",
    parcelas: data.parcelas,
    ativo: data.ativo,
  };
}
