export interface IPaises {
  pais_ID: number;
  pais: string;
  sigla: string;
  ddi: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostPaises {
  pais: string;
  sigla: string;
  ddi: string;
  ativo: boolean;
}

// Função para transformar um IPaises em um PostPaises
export function transformarParaPostPaises(data: IPaises): PostPaises {
  return {
    pais: data.pais,
    sigla: data.sigla,
    ddi: data.ddi,
    ativo: data.ativo,
  };
}

export interface PutPaises {
  pais_ID: number;
  pais: string;
  sigla: string;
  ddi: string;
  ativo: boolean;
}

// Função para transformar um IPaises em um PutPaises
export function transformarParaPutPaises(data: IPaises): PutPaises {
  return {
    pais_ID: data.pais_ID,
    pais: data.pais,
    sigla: data.sigla,
    ddi: data.ddi,
    ativo: data.ativo,
  };
}
