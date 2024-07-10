import { z } from "zod";

export const createClienteSchema = z
  .object({
    cliente_ID: z.coerce.number().readonly(),

    tipo_pessoa: z.string().min(1, "Obrigatório"),
    cpf_cnpj: z.string().min(1, "Obrigatório"),
    nome_razaoSocial: z
      .string()
      .min(1, "Obrigatório")
      .regex(
        new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
        "Somente letras"
      )
      .trim(),
    apelido_nomeFantasia: z.string().trim(),
    rg_inscricaoEstadual: z.string(),
    dataNascimento_dataAbertura: z.string(),
    genero: z.string(),
    email: z.string().min(1, "Obrigatório").email(),
    celular: z
      .string()
      .min(1, "Obrigatório")
      .regex(new RegExp(/^\d+$/), "Somente números"),
    ramo_atividade: z
      .string()
      .regex(
        new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/),
        "Somente letras"
      )
      .trim(),

    cidade_ID: z.coerce.number().min(1, "Obrigatório"),
    cidade: z.string().readonly(),
    estado: z.string().readonly(),
    pais: z.string().readonly(),

    logradouro: z.string().min(1, "Obrigatório").trim(),
    numero: z
      .string()
      .min(1, "Obrigatório")
      .regex(new RegExp(/^\d+$/), "Somente números"),
    bairro: z.string().min(1, "Obrigatório"),
    complemento: z.string(),
    cep: z
      .string()
      .min(1, "Obrigatório")
      .regex(new RegExp(/^\d+$/), "Somente números"),
    origem_ID: z.coerce.number(),
    origem: z.string().min(1, "Obrigatório"),
    interesses: z.string().trim(),

    usuarios: z.array(
      z.object({
        usuario_ID: z.coerce.number().min(1, "Obrigatório"),
        nome: z.string().readonly(),
        cpf: z.string().readonly(),
      })
    ),

    ativo: z.boolean({
      required_error: "Obrigatório",
    }),
    data_cadastro: z.string(),
    data_ult_alt: z.string(),
  })
  .refine(
    (data) => {
      const { tipo_pessoa, nome_razaoSocial } = data;
      const regexFisica = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;
      const regexJuridica = /^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;

      if (tipo_pessoa === "física") {
        return regexFisica.test(nome_razaoSocial);
      } else if (tipo_pessoa === "jurídica") {
        return regexJuridica.test(nome_razaoSocial);
      }
      return false;
    },
    {
      message: "Nome/Razão Social inválido",
    }
  );

export type ClienteSchema = z.infer<typeof createClienteSchema>;
