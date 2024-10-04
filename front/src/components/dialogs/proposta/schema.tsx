import { z } from "zod";

export const createPropostasSchema = z.object({
  id: z.coerce.number().readonly(),

  cliente_id: z.coerce.number().nullable(),
  tipo_pessoa: z.string().min(1, "Obrigatóro").readonly(),
  cpf_cnpj: z.string().min(1, "Obrigatóro").readonly(),
  nome_razaoSocial: z.string().min(1, "Obrigatóro").readonly(),

  peridiocidade_id: z.coerce.number().min(1, "Obrigatório"),
  descricao: z.string().readonly(),
  dias: z.coerce.number().readonly(),

  data_proposta: z.string().min(1, "Obrigatório"),
  prazo_final: z.string().min(1, "Obrigatório"),
  data_inicio: z.string().min(1, "Obrigatório"),

  total: z.string(),
  situacao: z.string().min(1, "Obrigatório"),

  servicos: z
    .array(
      z.object({
        servico_id: z.coerce.number().min(1, "Obrigatório"),
        servico: z.string().min(1, "Obrigatório"),
        quantidade: z.coerce.number().min(1, "Obrigatório"),
        valor_unitario: z.string().refine((val) => val != "0,00", {
          message: "Obrigatório",
        }),
        desconto: z.string(),
        valor_total: z
          .string()
          .transform((val) => {
            return parseFloat(val.replace(",", "."));
          })
          .refine((val) => val >= 0.01, {
            message: "Valor inválido",
          })
          .transform((val) => String(val)),
      })
    )
    .min(1, "Deve haver pelo menos um serviço")
    .max(10, "Não pode ter mais que 10 serviços"),

  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type PropostasSchema = z.infer<typeof createPropostasSchema>;
