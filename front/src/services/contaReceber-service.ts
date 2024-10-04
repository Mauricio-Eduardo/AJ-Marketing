import { api } from "../config/api";
import { UpdateContaReceberDto } from "../models/contaReceber/dto/updateContaReceber.DTO";

export class ContasReceberService {
  async getAll() {
    const response = await api.get("GetAllContasReceber");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetContaReceber", { params: { id: pId } });
    return response.data;
  }

  async update(updateContaReceberDto: UpdateContaReceberDto) {
    const response = await api.put("PutContaReceber", updateContaReceberDto);
    return String(response.data);
  }
}
