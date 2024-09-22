import { ModelPai } from "../../modelPai/ModelPai";

export class Peridiocidade extends ModelPai {
  descricao: string;
  dias: number;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pDescricao: string,
    pDias: number
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.descricao = pDescricao;
    this.dias = pDias;
  }
}
