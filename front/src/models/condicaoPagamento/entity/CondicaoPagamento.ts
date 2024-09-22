import { ModelPai } from "../../modelPai/ModelPai";

export class CondicaoPagamento extends ModelPai {
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

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pCondicaoPagamento: string,
    pQuantidadeParcelas: number,
    pJuros: string,
    pMulta: string,
    pDesconto: string,
    pParcelas: {
      numeroParcela: number;
      dias: number;
      porcentagem: string;
      formaPag_id: number;
      formaPagamento: string;
    }[]
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.condicaoPagamento = pCondicaoPagamento;
    this.quantidadeParcelas = pQuantidadeParcelas;
    this.juros = pJuros;
    this.multa = pMulta;
    this.desconto = pDesconto;
    this.parcelas = pParcelas;
  }
}
