import { ModelPai } from "../../modelPai/ModelPai";

export class Servico extends ModelPai {
  servico: string;
  valor: string;
  descricao: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pServico: string,
    pValor: string,
    pDescricao: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.servico = pServico;
    this.valor = pValor;
    this.descricao = pDescricao;
  }
}
