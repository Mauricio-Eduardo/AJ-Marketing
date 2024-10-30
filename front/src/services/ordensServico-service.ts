import { api } from "../config/api";
import { UpdateOrdemServicoDto } from "../models/ordemServico/dto/updateOrdemServico.dto";

export class OrdensServicoService {
  async getAll(situacao: string) {
    const response = await api.get(`GetAllOrdens?situacao=${situacao}`);
    return response.data;
  }

  async getAllPostados() {
    const response = await api.get(`GetAllPostados`);
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

  async iniciarPausar(id: number, situacao: string) {
    const response = await api.put(
      `IniciarPausar?id=${id}&situacao=${situacao}`
    );
    return String(response.data);
  }

  async entregar(id: number) {
    const response = await api.put(`Entregar?id=${id}`);
    return String(response.data);
  }

  async postar(id: number) {
    const response = await api.put(`Postar?id=${id}`);
    return String(response.data);
  }
}
