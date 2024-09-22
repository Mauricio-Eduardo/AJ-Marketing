import { api } from "../config/api";
import { CreateServicoDto } from "../models/servico/dto/createServico.dto";
import { UpdateServicoDto } from "../models/servico/dto/updateServico.dto";

export class ServicosService {
  async getAll() {
    const response = await api.get("GetAllServicos");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetServico", { params: { id: pId } });
    return response.data;
  }

  async create(createServicoDto: CreateServicoDto) {
    const response = await api.post("PostServico", createServicoDto);
    return String(response.data);
  }

  async update(updateServicoDto: UpdateServicoDto) {
    const response = await api.put("PutServico", updateServicoDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteServico", {
      params: { id: id },
    });
    return String(response.data);
  }
}
