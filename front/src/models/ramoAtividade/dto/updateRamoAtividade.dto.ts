import { RamoAtividade } from "../entity/RamoAtividade";

export interface UpdateRamoAtividadeDto {
  id: number;
  ramo: string;
  ativo: boolean;
}

export function transformarParaPutRamoAtividade(
  data: RamoAtividade
): UpdateRamoAtividadeDto {
  return {
    id: data.id,
    ramo: data.ramo,
    ativo: data.ativo,
  };
}
