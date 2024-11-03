import { z } from "zod";

export const createPropostasSchema = z.object({
  id: z.coerce.number().readonly(),

  cliente_id: z.coerce.number().min(1, "Obrigatório"),
  tipo_pessoa: z.string().readonly(),
  cpf_cnpj: z.string().readonly(),
  nome_razaoSocial: z.string().readonly(),

  condPag_id: z.coerce.number().min(1, "Obrigatório"),
  condicaoPagamento: z.string().readonly(),

  prazo_final: z.string().min(1, "Obrigatório"),
  data_aprovacao: z.string().nullable(),
  data_inicio: z.string().nullable(),

  total: z.string(),
  situacao: z.string().min(1, "Obrigatório"),

  servicos: z
    .array(
      z.object({
        servico_id: z.coerce.number().min(1, "Obrigatório"),
        servico: z.string().readonly(),
        quantidade: z.coerce.number().min(1, "Obrigatório"),
        valor_unitario: z.string().refine((val) => val != "0,00", {
          message: "Obrigatório",
        }),
        desconto: z.string(),
        valor_total: z
          .string()
          .refine((val) => parseFloat(val) >= 0.01, {
            message: "Valor inválido",
          })
          .transform((val) => String(val)),
        peridiocidade_id: z.coerce.number().min(1, "Obrigatório"),
        descricao: z.string().readonly(),
        dias: z.coerce.number().readonly(),
      })
    )
    .min(1, "Deve haver pelo menos um serviço")
    .max(10, "Não pode ter mais que 10 serviços"),

  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type PropostasSchema = z.infer<typeof createPropostasSchema>;
