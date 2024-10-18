import { api } from "../config/api";
import { ReceberContaReceberDto } from "../models/contaReceber/dto/receberContaReceber.dto";

export class ContasReceberService {
  async getAll() {
    const response = await api.get("GetAllContasReceber");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetContaReceber", { params: { id: pId } });
    return response.data;
  }

  async receber(receberContaReceberDto: ReceberContaReceberDto) {
    const response = await api.post("ReceberConta", receberContaReceberDto);
    return String(response.data);
  }
}
