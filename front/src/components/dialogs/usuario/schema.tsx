import { z } from "zod";

export const createUsuarioSchema = (action: string | null) => {
  return z
    .object({
      id: z.coerce.number().readonly().default(0),
      nome: z
        .string()
        .min(1, "Obrigatório")
        .regex(
          /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
          "Somente letras"
        )
        .trim(),
      email: z
        .string()
        .min(1, "Obrigatório")
        .email({ message: "E-mail inválido!" }),
      senha: z
        .string()
        .refine((val) => (action === "Cadastrar" ? val.length >= 6 : true), {
          message: "Senha deve ter no mínimo 6 dígitos!",
        }),
      ativo: z.boolean({
        required_error: "Obrigatório",
      }),
      data_cadastro: z.string(),
      data_ult_alt: z.string(),
      novoUsuario_id: z.coerce
        .number()
        .nullable()

        .refine((val) => (action === "Excluir" ? val != 0 : true), {
          message: "Obrigatório",
        }),
      novoUsuario_nome: z.string().readonly().default("").optional(),
    })
    .refine(
      (data) => {
        return (
          data.ativo ||
          (data.novoUsuario_id !== null && data.novoUsuario_id !== 0)
        );
      },
      {
        path: ["novoUsuario_id"],
        message: "Obrigatório",
      }
    );
};

export type UsuarioSchema = z.infer<ReturnType<typeof createUsuarioSchema>>;
