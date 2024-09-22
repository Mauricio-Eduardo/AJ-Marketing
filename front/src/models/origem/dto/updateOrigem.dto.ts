import { Origem } from "../entity/Origem";

export interface UpdateOrigemDto {
  id: number;
  origem: string;
  ativo: boolean;
}

export function transformarParaPutOrigem(data: Origem): UpdateOrigemDto {
  return {
    id: data.id,
    origem: data.origem,
    ativo: data.ativo,
  };
}
