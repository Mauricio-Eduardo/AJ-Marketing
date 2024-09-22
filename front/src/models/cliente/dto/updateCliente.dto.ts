import { removeFormatting } from "../../../components/form/Formats";
import { Interesse } from "../../interesse/entity/Interesse";
import { RamoAtividade } from "../../ramoAtividade/entity/RamoAtividade";
import { Usuario } from "../../usuario/entity/Usuario";
import { Cliente } from "../entity/Cliente";

export interface UpdateClienteDto {
  id: number;
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
  situacao: string;

  usuarios: Usuario[];
  interesses: Interesse[];
  ramos: RamoAtividade[];

  ativo: boolean;
}

export function transformarParaPutCliente(data: Cliente): UpdateClienteDto {
  return {
    id: data.id,
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
    situacao: data.situacao,
    usuarios: data.usuarios,
    interesses: data.interesses,
    ramos: data.ramos,
    ativo: data.ativo,
  };
}
