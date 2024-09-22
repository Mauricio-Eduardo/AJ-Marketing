import { ModelPai } from "../../modelPai/ModelPai";

export class RamoAtividade extends ModelPai {
  ramo: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pRamo: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.ramo = pRamo;
  }
}
