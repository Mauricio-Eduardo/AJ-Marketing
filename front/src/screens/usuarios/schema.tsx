import { z } from "zod";

export const createUsuarioSchema = z.object({
  usuario_ID: z.coerce.number().readonly().default(0),
  cpf: z
    .string()
    .min(1, "Obrigatório")
    .min(11, "CPF deve conter 11 números!")
    .regex(new RegExp(/^\d+$/), "Somente números"),
  nome: z
    .string()
    .min(1, "Obrigatório")
    .regex(
      new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
      "Somente letras"
    )
    .trim(),
  email: z
    .string()
    .min(1, "Obrigatório")
    .email({ message: "E-mail inválido!" }),
  senha: z
    .string()
    .min(1, "Obrigatório")
    .min(6, "Senha deve ter no mínimo 6 dígitos!"),
  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type UsuarioSchema = z.infer<typeof createUsuarioSchema>;
