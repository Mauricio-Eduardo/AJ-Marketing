export interface IEstados {
  estado_ID: number;
  estado: string;
  uf: string;
  pais_ID: number;
  pais: string;
  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostEstados {
  estado: string;
  uf: string;
  pais_ID: number;
  ativo: boolean;
}

// Função para transformar um IEstados em um PostEstados
export function transformarParaPostEstados(data: IEstados): PostEstados {
  return {
    estado: data.estado,
    uf: data.uf,
    pais_ID: data.pais_ID,
    ativo: data.ativo,
  };
}

export interface PutEstados {
  estado_ID: number;
  estado: string;
  uf: string;
  pais_ID: number;
  ativo: boolean;
}

// Função para transformar um IEstados em um PutEstados
export function transformarParaPutEstados(data: IEstados): PutEstados {
  return {
    estado_ID: data.estado_ID,
    estado: data.estado,
    uf: data.uf,
    pais_ID: data.pais_ID,
    ativo: data.ativo,
  };
}
