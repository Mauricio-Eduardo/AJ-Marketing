import { z } from "zod";

export const createPeridiocidadeSchema = z.object({
  id: z.coerce.number().readonly(),
  descricao: z.string().min(1, "Obrigatório").trim(),
  dias: z.coerce.number().min(1, "Obrigatório"),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type PeridiocidadeSchema = z.infer<typeof createPeridiocidadeSchema>;
