import { Usuario } from "../entity/Usuario";

export interface UpdateUsuarioDto {
  id: number;
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
}

export function transformarParaPutUsuario(data: Usuario): UpdateUsuarioDto {
  return {
    id: data.id,
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    ativo: data.ativo,
  };
}
