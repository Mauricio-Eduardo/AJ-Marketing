import { api } from "../config/api";
import { UpdateContaReceberDto } from "../models/contaReceber/dto/receberContaReceber.dto";

export class ContasReceberService {
  async getAll() {
    const response = await api.get("GetAllContasReceber");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get(`GetContaReceber?id=${pId}`);
    return response.data;
  }

  async receber(updateContaReceberDto: UpdateContaReceberDto) {
    const response = await api.put("ReceberConta", updateContaReceberDto);
    return String(response.data);
  }

  async reabrir(pId: number) {
    const response = await api.put(`ReabrirConta?id=${pId}`);
    return String(response.data);
  }
}
