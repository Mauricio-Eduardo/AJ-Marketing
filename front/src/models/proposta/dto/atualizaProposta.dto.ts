import { Proposta } from "../entity/Proposta";

export interface AtualizaPropostaDto {
  id: number;
  data_aprovacao: string | null;
  data_inicio: string | null;
  situacao: string;
}

export function transformarParaAtualizarProposta(
  data: Proposta
): AtualizaPropostaDto {
  return {
    id: data.id,
    data_aprovacao: data.data_aprovacao ? data.data_aprovacao : null,
    data_inicio: data.data_inicio ? data.data_inicio : null,
    situacao: data.situacao,
  };
}
