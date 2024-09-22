import { Interesse } from "../entity/Interesse";

export interface UpdateInteresseDto {
  id: number;
  interesse: string;
  ativo: boolean;
}

export function transformarParaPutInteresse(
  data: Interesse
): UpdateInteresseDto {
  return {
    id: data.id,
    interesse: data.interesse,
    ativo: data.ativo,
  };
}
