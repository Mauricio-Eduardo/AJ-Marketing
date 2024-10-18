import { formatToDecimal } from "../../../components/form/Formats";
import { Proposta } from "../entity/Proposta";

export interface UpdatePropostaDto {
  id: number;
  condPag_id: number;
  prazo_final: string;
  data_aprovacao: string | null;
  data_inicio: string | null;
  total: string;
  situacao: string;

  servicos: {
    servico_id: number;
    quantidade: number;
    valor_unitario: string;
    desconto: string;
    valor_total: string;
    peridiocidade_id: number;
    descricao: string;
    dias: number;
  }[];
}

export function transformarParaPutProposta(data: Proposta): UpdatePropostaDto {
  return {
    id: data.id,
    condPag_id: data.condPag_id,
    prazo_final: data.prazo_final,
    data_aprovacao: data.data_aprovacao,
    data_inicio: data.data_inicio,
    total: formatToDecimal(data.total),
    situacao: data.situacao,
    servicos: data.servicos.map((servico) => ({
      ...servico,
      valor_unitario: formatToDecimal(servico.valor_unitario),
      desconto: formatToDecimal(servico.desconto),
      valor_total: formatToDecimal(servico.valor_total),
    })),
  };
}
