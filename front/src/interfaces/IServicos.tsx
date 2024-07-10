export interface IServicos {
  servico_ID: number;
  servico: string;
  valor: string;
  descricao: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostServicos {
  servico: string;
  valor: string;
  descricao: string;
  ativo: boolean;
}

// Função para transformar um IServicos em um PostServicos
export function transformarParaPostServicos(data: IServicos): PostServicos {
  return {
    servico: data.servico,
    valor: data.valor,
    descricao: data.descricao,
    ativo: data.ativo,
  };
}

export interface PutServicos {
  servico_ID: number;
  servico: string;
  valor: string;
  descricao: string;
  ativo: boolean;
}

// Função para transformar um IServicos em um PutServicos
export function transformarParaPutServicos(data: IServicos): PutServicos {
  return {
    servico_ID: data.servico_ID,
    servico: data.servico,
    valor: data.valor,
    descricao: data.descricao,
    ativo: data.ativo,
  };
}
