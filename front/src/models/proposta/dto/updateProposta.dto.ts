import { formatToDecimal } from "../../../components/form/Formats";
import { Proposta } from "../entity/Proposta";

export interface UpdatePropostaDto {
  id: number;
  peridiocidade_id: number;
  data_proposta: string;
  prazo_final: string;
  data_inicio: string;
  total: string;
  situacao: string;

  servicos: {
    servico_id: number;
    quantidade: number;
    valor_unitario: string;
    desconto: string;
    valor_total: string;
  }[];
}

export function transformarParaPutProposta(data: Proposta): UpdatePropostaDto {
  return {
    id: data.id,
    peridiocidade_id: data.peridiocidade_id,
    data_proposta: data.data_proposta,
    prazo_final: data.prazo_final,
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
