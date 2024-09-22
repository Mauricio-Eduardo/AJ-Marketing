import { ModelPai } from "../../modelPai/ModelPai";

export class Pais extends ModelPai {
  pais: string;
  sigla: string;
  ddi: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pPais: string,
    pSigla: string,
    pDdi: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.pais = pPais;
    this.sigla = pSigla;
    this.ddi = pDdi;
  }
}
