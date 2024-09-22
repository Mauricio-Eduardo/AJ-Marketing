import { z } from "zod";

export const createContratosSchema = z.object({
  id: z.coerce.number().readonly(),

  cliente_id: z.coerce.number().min(1, "Obrigatório"),
  cpf_cnpj: z.string().readonly(),
  nome_razaoSocial: z.string().readonly(),

  proposta_id: z.coerce.number().min(1, "Obrigatório"),
  total: z.string().readonly(),

  data_contrato: z.string().min(1, "Obrigatório").readonly(),

  condPag_id: z.coerce.number().min(1, "Obrigatório"),
  condicaoPagamento: z.string().readonly(),

  situacao: z.string().min(1, "Obrigatório"),

  servicos: z.array(
    z.object({
      servico_id: z.coerce.number().readonly(),
      servico: z.string().readonly(),
      quantidade: z.coerce.number().readonly(),
      valor_unitario: z
        .string()
        .refine((val) => val != "0,00", {
          message: "Obrigatório",
        })
        .readonly(),
      desconto: z.string().readonly(),
      valor_total: z
        .string()
        .transform((val) => {
          return parseFloat(val.replace(",", "."));
        })
        .refine((val) => val >= 0.01, {
          message: "Valor inválido",
        })
        .transform((val) => String(val))
        .readonly(),
    })
  ),
  // .readonly(),
});

export type ContratosSchema = z.infer<typeof createContratosSchema>;
