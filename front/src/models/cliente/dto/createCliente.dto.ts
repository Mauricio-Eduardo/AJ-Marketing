import { removeFormatting } from "../../../components/form/Formats";
import { Interesse } from "../../interesse/entity/Interesse";
import { RamoAtividade } from "../../ramoAtividade/entity/RamoAtividade";
import { Usuario } from "../../usuario/entity/Usuario";
import { Cliente } from "../entity/Cliente";

export interface CreateClienteDto {
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  apelido_nomeFantasia: string;
  rg_inscricaoEstadual: string;
  genero: string;
  email: string;
  celular: string;
  cidade_id: number;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cep: string;
  origem_id: number;

  usuarios: Usuario[];
  interesses: Interesse[];
  ramos: RamoAtividade[];
}

export function transformarParaPostCliente(data: Cliente): CreateClienteDto {
  return {
    tipo_pessoa: data.tipo_pessoa,
    cpf_cnpj: removeFormatting(data.cpf_cnpj),
    nome_razaoSocial: data.nome_razaoSocial,
    apelido_nomeFantasia: data.apelido_nomeFantasia,
    rg_inscricaoEstadual: data.rg_inscricaoEstadual,
    genero: data.genero,
    email: data.email,
    celular: removeFormatting(data.celular),
    cidade_id: data.cidade_id,
    logradouro: data.logradouro,
    numero: data.numero,
    bairro: data.bairro,
    complemento: data.complemento,
    cep: data.cep,
    origem_id: data.origem_id,
    usuarios: data.usuarios,
    interesses: data.interesses,
    ramos: data.ramos,
  };
}
