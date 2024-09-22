import { z } from "zod";

export const createPeridiocidadeSchema = z.object({
  id: z.coerce.number().readonly(),
  descricao: z.string().min(1, "Obrigatório").trim(),
  dias: z
    .string()
    .min(1, "Obrigatório")
    .regex(new RegExp(/^\d+$/), "Somente números")
    .transform((val) => parseInt(val)),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type PeridiocidadeSchema = z.infer<typeof createPeridiocidadeSchema>;
