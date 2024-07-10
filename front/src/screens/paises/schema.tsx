import { z } from "zod";

export const createPaisSchema = z.object({
  pais_ID: z.coerce.number().readonly(),
  pais: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    )
    .trim(),
  sigla: z
    .string()
    .min(2, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    ),
  ddi: z
    .string()
    .min(1, "Obrigatório")
    .regex(new RegExp(/^\d+$/), "Somente números"),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type PaisSchema = z.infer<typeof createPaisSchema>;
