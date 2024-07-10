export interface IClientes {
  cliente_ID: number;
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  apelido_nomeFantasia: string;
  rg_inscricaoEstadual: string;
  dataNascimento_dataAbertura: string;
  genero: string;
  email: string;
  celular: string;
  ramo_atividade: string;

  cidade_ID: number;
  cidade: string; // Vai ser usado somente para exibição dos dados
  estado: string; // Vai ser usado somente para exibição dos dados
  pais: string; // Vai ser usado somente para exibição dos dados

  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cep: string;
  origem_ID: number;
  origem: string;
  interesses: string;

  usuarios: {
    usuario_ID: number;
    nome: string;
    cpf: string;
  }[];

  ativo: boolean;
  data_cadastro: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir o valor
  data_ult_alt: string; // Vai ser usado somente para exibição dos dados, a API cuida de incluir/alterar o valor
}

export interface PostClientes {
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  apelido_nomeFantasia: string;
  rg_inscricaoEstadual: string;
  dataNascimento_dataAbertura: string;
  genero: string;
  email: string;
  celular: string;
  ramo_atividade: string;

  cidade_ID: number;
  cidade: string; // Vai ser usado somente para exibição dos dados
  estado: string; // Vai ser usado somente para exibição dos dados
  pais: string; // Vai ser usado somente para exibição dos dados

  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cep: string;
  origem_ID: number;
  origem: string;
  interesses: string;

  usuarios: {
    usuario_ID: number;
    nome: string;
    cpf: string;
  }[];

  ativo: boolean;
}

// Função para transformar um IClientes em um PostClientes
export function transformarParaPostClientes(data: IClientes): PostClientes {
  return {
    tipo_pessoa: data.tipo_pessoa,
    cpf_cnpj: data.cpf_cnpj,
    nome_razaoSocial: data.nome_razaoSocial,
    apelido_nomeFantasia: data.apelido_nomeFantasia,
    rg_inscricaoEstadual: data.rg_inscricaoEstadual,
    dataNascimento_dataAbertura: data.dataNascimento_dataAbertura,
    genero: data.genero,
    email: data.email,
    celular: data.celular,
    ramo_atividade: data.ramo_atividade,
    cidade_ID: data.cidade_ID,
    cidade: data.cidade,
    estado: data.estado,
    pais: data.pais,
    logradouro: data.logradouro,
    numero: data.numero,
    bairro: data.bairro,
    complemento: data.complemento,
    cep: data.cep,
    origem_ID: data.origem_ID,
    origem: data.origem,
    interesses: data.interesses,
    usuarios: data.usuarios,
    ativo: data.ativo,
  };
}

export interface PutClientes {
  cliente_ID: number;
  nome_razaoSocial: string;
  apelido_nomeFantasia: string;
  rg_inscricaoEstadual: string;
  dataNascimento_dataAbertura: string;
  genero: string;
  email: string;
  celular: string;
  ramo_atividade: string;

  cidade_ID: number;
  cidade: string;
  estado: string;
  pais: string;

  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cep: string;
  origem_ID: number;
  origem: string;
  interesses: string;

  usuarios: {
    usuario_ID: number;
    nome: string;
    cpf: string;
  }[];

  ativo: boolean;
}

// Função para transformar um IClientes em um PutClientes
export function transformarParaPutClientes(data: IClientes): PutClientes {
  return {
    cliente_ID: data.cliente_ID,
    nome_razaoSocial: data.nome_razaoSocial,
    apelido_nomeFantasia: data.apelido_nomeFantasia,
    rg_inscricaoEstadual: data.rg_inscricaoEstadual,
    dataNascimento_dataAbertura: data.dataNascimento_dataAbertura,
    genero: data.genero,
    email: data.email,
    celular: data.celular,
    ramo_atividade: data.ramo_atividade,
    cidade_ID: data.cidade_ID,
    cidade: data.cidade,
    estado: data.estado,
    pais: data.pais,
    logradouro: data.logradouro,
    numero: data.numero,
    bairro: data.bairro,
    complemento: data.complemento,
    cep: data.cep,
    origem_ID: data.origem_ID,
    origem: data.origem,
    interesses: data.interesses,
    usuarios: data.usuarios,
    ativo: data.ativo,
  };
}
