export interface IFormasPagamento {
  formaPag_ID: number;
  formaPagamento: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostFormasPagamento {
  formaPagamento: string;
  ativo: boolean;
}

// Função para transformar um IFormasPagamento em um PostFormasPagamento
export function transformarParaPostFormasPagamento(
  data: IFormasPagamento
): PostFormasPagamento {
  return {
    formaPagamento: data.formaPagamento,
    ativo: data.ativo,
  };
}

export interface PutFormasPagamento {
  formaPag_ID: number;
  formaPagamento: string;
  ativo: boolean;
}

// Função para transformar um IFormasPagamento em um PutFormasPagamento
export function transformarParaPutFormasPagamento(
  data: IFormasPagamento
): PutFormasPagamento {
  return {
    formaPag_ID: data.formaPag_ID,
    formaPagamento: data.formaPagamento,
    ativo: data.ativo,
  };
}
