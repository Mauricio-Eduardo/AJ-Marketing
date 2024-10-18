import { z } from "zod";

export const createContaReceberSchema = z.object({
  id: z.coerce.number().readonly(),

  contrato_id: z.coerce.number().readonly(),

  cliente_id: z.coerce.number().min(1, "Obrigatório"),
  cpf_cnpj: z.string().readonly(),
  nome_razaoSocial: z.string().readonly(),

  formaPag_id: z.coerce.number().readonly(),
  formaPagamento: z.string().readonly(),

  parcela_id: z.coerce.number().readonly(),
  numeroParcela: z.coerce.number().readonly(),
  quantidadeParcelas: z.coerce.number().readonly(),

  total: z.string().min(1, "Obrigatório"),
  juros: z
    .string()
    .transform((val) => val.replace(",", "."))
    .readonly(),
  multa: z
    .string()
    .transform((val) => val.replace(",", "."))
    .readonly(),
  desconto: z
    .string()
    .transform((val) => val.replace(",", "."))
    .readonly(),
  data_vencimento: z.string().min(1, "Obrigatório"),

  situacao: z.string().min(1, "Obrigatório"),

  recebimentos: z.array(
    z.object({
      formaPag_id: z.coerce.number().min(1, "Obrigatório"),
      formaPagamento: z.string().readonly(),
      recebido: z.string().transform((val) => val.replace(",", ".")),
      juros: z.string().transform((val) => val.replace(",", ".")),
      multa: z.string().transform((val) => val.replace(",", ".")),
      desconto: z.string().transform((val) => val.replace(",", ".")),
      total: z.string().transform((val) => val.replace(",", ".")),
      data_recebimento: z.string().min(1, "Obrigatório"),
    })
  ),
});

export type ContaReceberSchema = z.infer<typeof createContaReceberSchema>;
