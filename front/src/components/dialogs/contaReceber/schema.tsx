import { z } from "zod";

export const createContaReceberSchema = z.object({
  id: z.coerce.number().readonly(),

  cliente_id: z.coerce.number().readonly(),
  cpf_cnpj: z.string().readonly(),
  nome_razaoSocial: z.string().readonly(),

  contrato_id: z.coerce.number().readonly(),

  parcela_id: z.coerce.number().readonly(),
  numeroParcela: z.coerce.number().readonly(),
  quantidadeParcelas: z.coerce.number().readonly(),

  data_vencimento: z.string(),

  valor_inicial: z.string(),
  desconto: z.string(),
  juros: z.string(),
  multa: z.string(),
  total: z.string(),

  valor_pago: z.string(),
  valor_aberto: z.string(),
  data_recebimento: z.string(),

  situacao: z.string().min(1, "Obrigatório"),
});

export type ContaReceberSchema = z.infer<typeof createContaReceberSchema>;
