import { ModelPai } from "../../modelPai/ModelPai";

export class Cidade extends ModelPai {
  cidade: string;
  ddd: string;
  estado_id: number;
  estado: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pCidade: string,
    pDdd: string,
    pEstado_id: number,
    pEstado: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.cidade = pCidade;
    this.ddd = pDdd;
    this.estado_id = pEstado_id;
    this.estado = pEstado;
  }
}
