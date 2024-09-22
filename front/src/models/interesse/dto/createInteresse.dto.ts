import { Interesse } from "../entity/Interesse";

export interface CreateInteresseDto {
  interesse: string;
}

export function transformarParaPostInteresse(
  data: Interesse
): CreateInteresseDto {
  return {
    interesse: data.interesse,
  };
}
