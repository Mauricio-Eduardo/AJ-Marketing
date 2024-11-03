import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateRamoAtividadeDto } from "../models/ramoAtividade/dto/createRamoAtividade.dto";
import { UpdateRamoAtividadeDto } from "../models/ramoAtividade/dto/updateRamoAtividade.dto";

export class RamosAtividadeService {
  async getAll() {
    const response = await api.get("GetAllRamosAtividade");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetRamoAtividade", { params: { id: pId } });
    return response.data;
  }

  async create(
    createRamoAtividadeDto: CreateRamoAtividadeDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>(
      "PostRamoAtividade",
      createRamoAtividadeDto
    );
    return response;
  }

  async update(
    updateRamoAtividadeDto: UpdateRamoAtividadeDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutRamoAtividade", updateRamoAtividadeDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteRamoAtividade", {
      params: { id: id },
    });
    return response;
  }
}
