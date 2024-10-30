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

  data_vencimento: z.string().readonly(),
  total: z
    .string()
    .min(1, "Obrigatório")
    .transform((val) => val.replace(",", ".")),

  percentJuros: z.string().readonly(),
  jurosRecebido: z.string().transform((val) => val.replace(",", ".")),
  percentMulta: z.string().readonly(),
  multaRecebida: z.string().transform((val) => val.replace(",", ".")),
  percentDesconto: z.string().readonly(),
  descontoConcedido: z.string().transform((val) => val.replace(",", ".")),

  totalRecebido: z
    .string()
    .transform((val) => {
      return parseFloat(val.replace(",", "."));
    })
    .refine((val) => val >= 0.01, {
      message: "Valor inválido",
    })
    .transform((val) => String(val)),
  data_recebimento: z.string().min(1, "Obrigatório"),

  situacao: z.string().min(1, "Obrigatório"),
});

export type ContaReceberSchema = z.infer<typeof createContaReceberSchema>;
