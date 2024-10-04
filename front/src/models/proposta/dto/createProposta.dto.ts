import {
  formatToDecimal,
  removeFormatting,
} from "../../../components/form/Formats";
import { Proposta } from "../entity/Proposta";

export interface CreatePropostaDto {
  cliente_id: number | null;
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  peridiocidade_id: number;
  data_proposta: string;
  prazo_final: string;
  data_inicio: string;
  total: string;

  servicos: {
    servico_id: number;
    quantidade: number;
    valor_unitario: string;
    desconto: string;
    valor_total: string;
  }[];
}

export function transformarParaPostProposta(data: Proposta): CreatePropostaDto {
  return {
    cliente_id: data.cliente_id,
    tipo_pessoa: data.tipo_pessoa,
    cpf_cnpj: removeFormatting(data.cpf_cnpj),
    nome_razaoSocial: data.nome_razaoSocial,
    peridiocidade_id: data.peridiocidade_id,
    data_proposta: data.data_proposta,
    prazo_final: data.prazo_final,
    data_inicio: data.data_inicio,
    total: formatToDecimal(data.total),
    servicos: data.servicos.map((servico) => ({
      ...servico,
      valor_unitario: formatToDecimal(servico.valor_unitario),
      desconto: formatToDecimal(servico.desconto),
      valor_total: formatToDecimal(servico.valor_total),
    })),
  };
}
