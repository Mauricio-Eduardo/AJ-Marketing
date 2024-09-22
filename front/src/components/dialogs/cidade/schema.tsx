import { z } from "zod";

export const createCidadeSchema = z.object({
  id: z.coerce.number().readonly(),
  cidade: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    )
    .trim(),
  ddd: z
    .string()
    .min(1, "Obrigatório")
    .regex(new RegExp(/^\d+$/), "Somente números"),
  estado_id: z.coerce.number().min(1, "Obrigatório"),
  estado: z.string(),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type CidadeSchema = z.infer<typeof createCidadeSchema>;
