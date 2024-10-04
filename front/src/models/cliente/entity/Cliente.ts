import { ModelPai } from "../../modelPai/ModelPai";

export class Cliente extends ModelPai {
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  apelido_nomeFantasia: string;
  rg_inscricaoEstadual: string;
  genero: string;
  email: string;
  celular: string;
  cidade_id: number;
  cidade: string;
  estado: string;
  pais: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cep: string;
  origem_id: number;
  origem: string;

  usuarios: any;
  interesses: any;
  ramos: any;

  constructor(
    pId: number,
    pAtivo: boolean,
    pDataCadastro: string,
    pDataUltAlt: string,
    pTipo_pessoa: string,
    pCpf_cnpj: string,
    pNome_razaoSocial: string,
    pApelido_nomeFantasia: string,
    pRg_inscricaoEstadual: string,
    pGenero: string,
    pEmail: string,
    pCelular: string,
    pCidade_id: number,
    pCidade: string,
    pEstado: string,
    pPais: string,
    pLogradouro: string,
    pNumero: string,
    pBairro: string,
    pComplemento: string,
    pCep: string,
    pOrigem_id: number,
    pOrigem: string,

    pUsuarios: any,
    pInteresses: any,
    pRamos: any
  ) {
    super(pId, pAtivo, pDataCadastro, pDataUltAlt);
    this.tipo_pessoa = pTipo_pessoa;
    this.cpf_cnpj = pCpf_cnpj;
    this.nome_razaoSocial = pNome_razaoSocial;
    this.apelido_nomeFantasia = pApelido_nomeFantasia;
    this.rg_inscricaoEstadual = pRg_inscricaoEstadual;
    this.genero = pGenero;
    this.email = pEmail;
    this.celular = pCelular;
    this.cidade_id = pCidade_id;
    this.cidade = pCidade;
    this.estado = pEstado;
    this.pais = pPais;
    this.logradouro = pLogradouro;
    this.numero = pNumero;
    this.bairro = pBairro;
    this.complemento = pComplemento;
    this.cep = pCep;
    this.origem_id = pOrigem_id;
    this.origem = pOrigem;
    this.usuarios = pUsuarios;
    this.interesses = pInteresses;
    this.ramos = pRamos;
  }
}
