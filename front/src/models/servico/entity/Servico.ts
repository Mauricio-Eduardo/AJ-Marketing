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

export class ServicoProposta extends ModelPai {
  servico: string;
  valor: string;
  descricao: string;
  peridiocidade_id: number;
  pDescricao: string;
  dias: number;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pServico: string,
    pValor: string,
    pDescricao: string,
    pPeridiocidade_id: number,
    pPDescricao: string,
    pDias: number
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.servico = pServico;
    this.valor = pValor;
    this.descricao = pDescricao;
    this.peridiocidade_id = pPeridiocidade_id;
    this.pDescricao = pPDescricao;
    this.dias = pDias;
  }
}
