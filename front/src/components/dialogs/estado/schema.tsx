import { z } from "zod";

export const createEstadoSchema = z.object({
  id: z.coerce.number().readonly(),
  estado: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    )
    .trim(),
  uf: z
    .string()
    .min(2, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    )
    .toUpperCase(),
  pais_id: z.coerce.number().min(1, "Obrigatório"),
  pais: z.string(),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type EstadoSchema = z.infer<typeof createEstadoSchema>;
