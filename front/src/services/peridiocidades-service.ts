import { api } from "../config/api";
import { CreatePeridiocidadeDto } from "../models/peridiocidade/dto/createPeridiocidade.dto";
import { UpdatePeridiocidadeDto } from "../models/peridiocidade/dto/updatePeridiocidade.dto";

export class PeridiocidadesService {
  async getAll() {
    const response = await api.get("GetAllPeridiocidades");
    return response.data;
  }

  async getAllAtivos() {
    const response = await api.get("GetAllPeridiocidadesAtivas");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetPeridiocidade", { params: { id: pId } });
    return response.data;
  }

  async create(createPeridiocidadeDto: CreatePeridiocidadeDto) {
    const response = await api.post(
      "PostPeridiocidade",
      createPeridiocidadeDto
    );
    return String(response.data);
  }

  async update(updatePeridiocidadeDto: UpdatePeridiocidadeDto) {
    const response = await api.put("PutPeridiocidade", updatePeridiocidadeDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeletePeridiocidade", {
      params: { id: id },
    });
    return String(response.data);
  }
}
