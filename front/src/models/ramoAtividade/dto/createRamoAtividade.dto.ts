import { RamoAtividade } from "../entity/RamoAtividade";

export interface CreateRamoAtividadeDto {
  ramo: string;
}

export function transformarParaPostRamoAtividade(
  data: RamoAtividade
): CreateRamoAtividadeDto {
  return {
    ramo: data.ramo,
  };
}
