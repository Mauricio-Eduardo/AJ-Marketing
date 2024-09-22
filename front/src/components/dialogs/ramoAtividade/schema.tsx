import { z } from "zod";

export const createRamoAtividadeSchema = z.object({
  id: z.coerce.number().readonly(),
  ramo: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    )
    .trim(),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type RamoAtividadeSchema = z.infer<typeof createRamoAtividadeSchema>;
