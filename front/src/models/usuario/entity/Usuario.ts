import { ModelPai } from "../../modelPai/ModelPai";

export class Usuario extends ModelPai {
  nome: string;
  email: string;
  senha: string;
  novoUsuario_id: number | null;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pNome: string,
    pEmail: string,
    pSenha: string,
    pNovoUsuario_id: number | null
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.nome = pNome;
    this.email = pEmail;
    this.senha = pSenha;
    this.novoUsuario_id = pNovoUsuario_id;
  }
}
