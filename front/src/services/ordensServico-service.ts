import { api } from "../config/api";
import { UpdateOrdemServicoDto } from "../models/ordemServico/dto/updateOrdemServico.dto";

export class OrdensServicoService {
  async getAll() {
    const response = await api.get("GetAllOrdensServico");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetOrdemServico", { params: { id: pId } });
    return response.data;
  }

  async update(updateOrdemServicoDto: UpdateOrdemServicoDto) {
    const response = await api.put("PutOrdemServico", updateOrdemServicoDto);
    return String(response.data);
  }
}
