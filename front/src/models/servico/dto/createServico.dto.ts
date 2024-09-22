import { Servico } from "../entity/Servico";

export interface CreateServicoDto {
  servico: string;
  valor: string;
  descricao: string;
}

export function transformarParaPostServico(data: Servico): CreateServicoDto {
  return {
    servico: data.servico,
    valor: data.valor,
    descricao: data.descricao,
  };
}
