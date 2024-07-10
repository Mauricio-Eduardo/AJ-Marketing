export interface ICidades {
  cidade_ID: number;
  cidade: string;
  ddd: string;
  estado_ID: number;
  estado: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostCidades {
  cidade: string;
  ddd: string;
  estado_ID: number;
  ativo: boolean;
}

// Função para transformar um ICidades em um PostCidades
export function transformarParaPostCidades(data: ICidades): PostCidades {
  return {
    cidade: data.cidade,
    ddd: data.ddd,
    estado_ID: data.estado_ID,
    ativo: data.ativo,
  };
}

export interface PutCidades {
  cidade_ID: number;
  cidade: string;
  ddd: string;
  estado_ID: number;
  ativo: boolean;
}

// Função para transformar um ICidades em um PutCidades
export function transformarParaPutCidades(data: ICidades): PutCidades {
  return {
    cidade_ID: data.estado_ID,
    cidade: data.estado,
    ddd: data.ddd,
    estado_ID: data.estado_ID,
    ativo: data.ativo,
  };
}
