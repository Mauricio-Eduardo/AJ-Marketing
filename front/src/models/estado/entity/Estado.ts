import { ModelPai } from "../../modelPai/ModelPai";

export class Estado extends ModelPai {
  estado: string;
  uf: string;
  pais_id: number;
  pais: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pEstado: string,
    pUf: string,
    pPais_id: number,
    pPais: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.estado = pEstado;
    this.uf = pUf;
    this.pais_id = pPais_id;
    this.pais = pPais;
  }
}
