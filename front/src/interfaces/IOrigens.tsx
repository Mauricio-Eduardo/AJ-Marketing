export interface IOrigens {
  origem_ID: number;
  origem: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostOrigens {
  origem: string;
  ativo: boolean;
}

// Função para transformar um IOrigens em um PostOrigens
export function transformarParaPostOrigens(data: IOrigens): PostOrigens {
  return {
    origem: data.origem,
    ativo: data.ativo,
  };
}

export interface PutOrigens {
  origem_ID: number;
  origem: string;
  ativo: boolean;
}

// Função para transformar um IOrigens em um PutOrigens
export function transformarParaPutOrigens(data: IOrigens): PutOrigens {
  return {
    origem_ID: data.origem_ID,
    origem: data.origem,
    ativo: data.ativo,
  };
}
