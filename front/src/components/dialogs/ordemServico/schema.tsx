import { z } from "zod";

export const createOrdensServicoSchema = z.object({
  id: z.coerce.number().readonly(),
  cliente_id: z.coerce.number().readonly(),
  nome_razaoSocial: z.string().readonly(),
  contrato_id: z.coerce.number().readonly(),
  usuario_id: z.coerce.number().readonly().nullable(),
  nome: z.string().readonly(),
  servico_id: z.coerce.number().readonly(),
  servico: z.string().readonly(),

  data_prazo: z.string(),
  data_entrega: z.string().nullable(),
  tema: z.string(),

  situacao: z.string(),
  postado: z.string(),
  referencia: z.string(),

  data_cadastro: z.string(),
  data_ult_alt: z.string(),
});

export type OrdensServicoSchema = z.infer<typeof createOrdensServicoSchema>;
