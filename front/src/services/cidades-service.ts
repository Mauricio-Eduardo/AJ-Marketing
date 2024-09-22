import { api } from "../config/api";
import { CreateCidadeDto } from "../models/cidade/dto/createCidade.dto";
import { UpdateCidadeDto } from "../models/cidade/dto/updateCidade.dto";

export class CidadesService {
  async getAll() {
    const response = await api.get("GetAllCidades");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetCidade", { params: { id: pId } });
    return response.data;
  }

  async create(createCidadeDto: CreateCidadeDto) {
    const response = await api.post("PostCidade", createCidadeDto);
    return String(response.data);
  }

  async update(updateCidadeDto: UpdateCidadeDto) {
    const response = await api.put("PutCidade", updateCidadeDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteCidade", {
      params: { id: id },
    });
    return String(response.data);
  }
}
