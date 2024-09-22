import { api } from "../config/api";
import { CreatePaisDto } from "../models/pais/dto/createPais.dto";
import { UpdatePaisDto } from "../models/pais/dto/updatePais.dto";

export class PaisesService {
  async getAll() {
    const response = await api.get("GetAllPaises");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetPais", { params: { id: pId } });
    return response.data;
  }

  async create(createPaisDto: CreatePaisDto) {
    const response = await api.post("PostPais", createPaisDto);
    return String(response.data);
  }

  async update(updatePaisDto: UpdatePaisDto) {
    const response = await api.put("PutPais", updatePaisDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeletePais", {
      params: { id: id },
    });
    return String(response.data);
  }
}
