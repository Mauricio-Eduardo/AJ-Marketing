import { z } from "zod";

export const createContratosSchema = z.object({
  id: z.coerce.number().readonly(),

  cliente_id: z.coerce.number().readonly().default(0),
  tipo_pessoa: z.string().readonly().default(""),
  cpf_cnpj: z.string().readonly(),
  nome_razaoSocial: z.string().readonly(),

  proposta_id: z.coerce.number().min(1, "Obrigatório"),
  total: z.string().readonly(),
  condicaoPagamento: z.string().readonly(),

  data_contrato: z.string().readonly(),
  data_vencimento: z.string().min(1, "Obrigatório"),

  situacao: z.string().readonly(),

  servicos: z.array(
    z.object({
      servico_id: z.coerce.number().readonly(),
      servico: z.string().readonly(),
      quantidade: z.coerce.number().readonly(),
      valor_unitario: z
        .string()
        .refine((val) => val != "0,00", {
          message: "Obrigatório",
        })
        .readonly(),
      desconto: z.string().readonly(),
      valor_total: z
        .string()
        .transform((val) => {
          return parseFloat(val.replace(",", "."));
        })
        .refine((val) => val >= 0.01, {
          message: "Valor inválido",
        })
        .transform((val) => String(val))
        .readonly(),
      peridiocidade_id: z.coerce.number().readonly(),
      descricao: z.string().readonly(),
      dias: z.coerce.number().readonly(),
    })
  ),
});

export type ContratosSchema = z.infer<typeof createContratosSchema>;
