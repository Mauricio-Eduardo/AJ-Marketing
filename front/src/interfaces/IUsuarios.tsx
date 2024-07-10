export interface IUsuarios {
  usuario_ID: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface IGetUsuarios {
  usuario_ID: number;
  cpf: string;
  nome: string;
}

export interface PostUsuarios {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
}

// Função para transformar um IUsuarios em um PostUsuarios
export function transformarParaPostUsuarios(data: IUsuarios): PostUsuarios {
  return {
    cpf: data.cpf,
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    ativo: data.ativo,
  };
}

export interface PutUsuarios {
  usuario_ID: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
}

// Função para transformar um IUsuarios em um PutUsuarios
export function transformarParaPutUsuarios(data: IUsuarios): PutUsuarios {
  return {
    usuario_ID: data.usuario_ID,
    cpf: data.cpf,
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    ativo: data.ativo,
  };
}
