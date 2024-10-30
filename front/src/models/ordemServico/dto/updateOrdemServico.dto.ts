import { OrdemServico } from "../entity/OrdemServico";

export interface UpdateOrdemServicoDto {
  id: number;
  usuario_id: number | null;
  data_prazo: string;
  data_entrega: string | null;
  tema: string;
  situacao: string;
  postado: string;
  referencia: string;
  observacoes: string;
}

export function transformarParaPutOrdemServico(
  data: OrdemServico
): UpdateOrdemServicoDto {
  return {
    id: data.id,
    usuario_id: data.usuario_id === 0 ? null : data.usuario_id,
    data_prazo: data.data_prazo,
    data_entrega: data.data_entrega ? data.data_entrega : null,
    tema: data.tema,
    situacao: data.situacao,
    postado: data.postado,
    referencia: data.referencia,
    observacoes: data.observacoes,
  };
}
