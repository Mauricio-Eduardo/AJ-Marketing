import { z } from "zod";

export const createClienteSchema = z.object({
  id: z.coerce.number().readonly(),

  tipo_pessoa: z.string().min(1, "Obrigatório"),
  cpf_cnpj: z.string().min(14, "CPF/CNPJ inválido"),
  nome_razaoSocial: z.string().min(5, "Deve ter mais que 5 caracteres").trim(),
  apelido_nomeFantasia: z.string().trim(),
  rg_inscricaoEstadual: z.string(),
  genero: z.string(),
  email: z.string().min(1, "Obrigatório").email().trim(),
  celular: z.string().min(15, "Número inválido").max(15),
  cidade_id: z.coerce.number().min(1, "Obrigatório"),
  cidade: z.string().readonly(),
  estado: z.string().readonly(),
  pais: z.string().readonly(),

  logradouro: z.string().min(1, "Obrigatório").trim(),
  numero: z.string().min(1, "Obrigatório").trim(),
  bairro: z.string().min(5, "Deve ter mais que 5 caracteres").trim(),
  complemento: z.string().trim(),
  cep: z
    .string()
    .min(1, "Obrigatório")
    .regex(new RegExp(/^\d+$/), "Somente números"),
  origem_id: z.coerce.number().min(1, "Obrigatório"),
  origem: z.string().readonly(),

  interesses: z.array(
    z.object({
      interesse_id: z.coerce.number().min(1, "Obrigatório"),
      interesse: z.string().readonly(),
    })
  ),

  ramos: z.array(
    z.object({
      ramo_id: z.coerce.number().min(1, "Obrigatório"),
      ramo: z.string().readonly(),
    })
  ),

  contratos: z.array(
    z.object({
      contrato_id: z.coerce.number().readonly(),
      data_contrato: z.string().readonly(),
      data_vencimento: z.string().readonly(),
      situacao: z.string().readonly(),
    })
  ),

  ativo: z.boolean({
    required_error: "Obrigatório",
  }),
  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type ClienteSchema = z.infer<typeof createClienteSchema>;
