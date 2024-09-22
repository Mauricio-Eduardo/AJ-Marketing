import { Servico } from "../entity/Servico";

export interface UpdateServicoDto {
  id: number;
  servico: string;
  valor: string;
  descricao: string;
  ativo: boolean;
}

export function transformarParaPutServico(data: Servico): UpdateServicoDto {
  return {
    id: data.id,
    servico: data.servico,
    valor: data.valor,
    descricao: data.descricao,
    ativo: data.ativo,
  };
}
