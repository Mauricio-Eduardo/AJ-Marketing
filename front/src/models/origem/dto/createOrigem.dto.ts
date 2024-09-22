import { Origem } from "../entity/Origem";

export interface CreateOrigemDto {
  origem: string;
}

export function transformarParaPostOrigem(data: Origem): CreateOrigemDto {
  return {
    origem: data.origem,
  };
}
