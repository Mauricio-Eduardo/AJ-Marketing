import { ModelPai } from "../../modelPai/ModelPai";

export class FormaPagamento extends ModelPai {
  formaPagamento: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pFormaPagamento: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.formaPagamento = pFormaPagamento;
  }
}
