import { ModelPai } from "../../modelPai/ModelPai";

export class Usuario extends ModelPai {
  nome: string;
  email: string;
  senha: string;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pNome: string,
    pEmail: string,
    pSenha: string
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.nome = pNome;
    this.email = pEmail;
    this.senha = pSenha;
  }
}
