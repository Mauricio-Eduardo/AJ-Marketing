import { z } from "zod";

export const createCondicoesPagamentoSchema = z.object({
  condPag_ID: z.coerce.number().readonly(),
  condicaoPagamento: z.string().min(1, "Obrigatório").trim(),
  juros: z.string().transform((val) => val.replace(",", ".")),
  multa: z.string().transform((val) => val.replace(",", ".")),
  desconto: z.string().transform((val) => val.replace(",", ".")),

  parcelas: z.array(
    z.object({
      numeroParcela: z.coerce.number().min(1, "Obrigatório"),
      dias: z.coerce.number().min(1, "Obrigatório"),
      porcentagem: z
        .string()
        .transform((val) => val.replace(",", "."))
        .transform((val) => parseFloat(val))
        .refine((val) => val > 0, {
          message: "Deve ser maior que 0",
        }),
      formaPag_ID: z.coerce.number().min(1, "Obrigatório"),
      formaPagamento: z.string().readonly(),
    })
  ),

  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type CondicoesPagamentoSchema = z.infer<
  typeof createCondicoesPagamentoSchema
>;
