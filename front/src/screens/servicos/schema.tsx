import { z } from "zod";

export const createServicoSchema = z.object({
  servico_ID: z.coerce.number().readonly(),
  servico: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    )
    .trim(),
  valor: z
    .string()
    .transform((val) => val.replace(",", "."))
    .superRefine((val, context) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O valor deve ser um número",
        });
      } else if (parsed <= 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O valor deve ser maior que 0,00",
        });
      }
    }),
  descricao: z.string().trim(),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type ServicoSchema = z.infer<typeof createServicoSchema>;
