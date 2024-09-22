import { z } from "zod";

export const createCondicoesPagamentoSchema = z.object({
  id: z.coerce.number().readonly(),
  condicaoPagamento: z.string().min(1, "Obrigatório").trim(),
  juros: z.string().transform((val) => val.replace(",", ".")),
  multa: z.string().transform((val) => val.replace(",", ".")),
  desconto: z.string().transform((val) => val.replace(",", ".")),

  quantidadeParcelas: z.coerce.number(),
  parcelas: z.array(
    z.object({
      numeroParcela: z.coerce.number().min(1, "Obrigatório"),
      dias: z.coerce.number().min(1, "Obrigatório"),
      porcentagem: z
        .string()
        .transform((val) => val.replace(",", ".")) // Substitui vírgula por ponto
        .transform((val) => parseFloat(val)) // Converte para número
        .refine((val) => val > 0, {
          message: "Obrigatório",
        })
        .transform((val) => val.toString()), // Converte o número de volta para string // Valida se o valor é maior que 0
      formaPag_id: z.coerce.number().min(1, "Obrigatório"),
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
