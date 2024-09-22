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

  async create(createRamoAtividadeDto: CreateRamoAtividadeDto) {
    const response = await api.post(
      "PostRamoAtividade",
      createRamoAtividadeDto
    );
    return String(response.data);
  }

  async update(updateRamoAtividadeDto: UpdateRamoAtividadeDto) {
    const response = await api.put("PutRamoAtividade", updateRamoAtividadeDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteRamoAtividade", {
      params: { id: id },
    });
    return String(response.data);
  }
}
