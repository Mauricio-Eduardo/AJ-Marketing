import { ModelPai } from "../../modelPai/ModelPai";

export class Interesse extends ModelPai {
  interesse: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pInteresse: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.interesse = pInteresse;
  }
}
