export interface ICondicoesPagamento {
  condPag_ID: number;
  condicaoPagamento: string;
  juros: string;
  multa: string;
  desconto: string;

  parcelas: {
    numeroParcela: number;
    dias: number;
    porcentagem: string;
    formaPag_ID: number;
    formaPagamento: string;
  }[];

  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostCondicoesPagamento {
  condicaoPagamento: string;
  juros: string;
  multa: string;
  desconto: string;

  parcelas: {
    numeroParcela: number;
    dias: number;
    porcentagem: string;
    formaPag_ID: number;
  }[];

  ativo: boolean;
}

// Função para transformar um ICondicoesPagamento em um PostCondicoesPagamento
export function transformarParaPostCondicoesPagamento(
  data: ICondicoesPagamento
): PostCondicoesPagamento {
  return {
    condicaoPagamento: data.condicaoPagamento,
    desconto: data.desconto,
    juros: data.juros,
    multa: data.multa,

    parcelas: data.parcelas,

    ativo: data.ativo,
  };
}

export interface PutCondicoesPagamento {
  condPag_ID: number;
  condicaoPagamento: string;
  juros: string;
  multa: string;
  desconto: string;

  parcelas: {
    numeroParcela: number;
    dias: number;
    porcentagem: string;
    formaPag_ID: number;
    formaPagamento: string;
  }[];

  ativo: boolean;
}

// Função para transformar um ICondicoesPagamento em um PutCondicoesPagamento
export function transformarParaPutCondicoesPagamento(
  data: ICondicoesPagamento
): PutCondicoesPagamento {
  return {
    condPag_ID: data.condPag_ID,
    condicaoPagamento: data.condicaoPagamento,
    desconto: data.desconto,
    juros: data?.juros,
    multa: data.multa,

    parcelas: data.parcelas,

    ativo: data.ativo,
  };
}
