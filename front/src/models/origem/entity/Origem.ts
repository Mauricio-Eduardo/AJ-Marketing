import { ModelPai } from "../../modelPai/ModelPai";

export class Origem extends ModelPai {
  origem: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pOrigem: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.origem = pOrigem;
  }
}
