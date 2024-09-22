export class ModelPai {
  id: number;
  ativo: boolean;
  data_cadastro: string;
  data_ult_alt: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pData_cadastro: string,
    pData_ult_alt: string
  ) {
    this.id = pId;
    this.ativo = pAtivo;
    this.data_cadastro = pData_cadastro;
    this.data_ult_alt = pData_ult_alt;
  }
}
