import { api } from "../config/api";
import { CreateOrigemDto } from "../models/origem/dto/createOrigem.dto";
import { UpdateOrigemDto } from "../models/origem/dto/updateOrigem.dto";

export class OrigensService {
  async getAll() {
    const response = await api.get("GetAllOrigens");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetOrigem", { params: { id: pId } });
    return response.data;
  }

  async create(createOrigemDto: CreateOrigemDto) {
    const response = await api.post("PostOrigem", createOrigemDto);
    return String(response.data);
  }

  async update(updateOrigemDto: UpdateOrigemDto) {
    const response = await api.put("PutOrigem", updateOrigemDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteOrigem", {
      params: { id: id },
    });
    return String(response.data);
  }
}
