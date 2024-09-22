import { Usuario } from "../entity/Usuario";

export interface CreateUsuarioDto {
  nome: string;
  email: string;
  senha: string;
}

export function transformarParaPostUsuario(data: Usuario): CreateUsuarioDto {
  return {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
  };
}
