import { Usuario } from "../entity/Usuario";

export interface UpdateUsuarioDto {
  id: number;
  nome: string;
  email: string;
  senha: string;
  novoUsuario_id: number | null;
  ativo: boolean;
}

export function transformarParaPutUsuario(data: Usuario): UpdateUsuarioDto {
  return {
    id: data.id,
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    novoUsuario_id: data.novoUsuario_id,
    ativo: data.ativo,
  };
}
