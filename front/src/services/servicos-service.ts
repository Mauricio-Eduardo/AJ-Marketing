import { AxiosResponse } from "axios";
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

  async create(
    createServicoDto: CreateServicoDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>("PostServico", createServicoDto);
    return response;
  }

  async update(
    updateServicoDto: UpdateServicoDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutServico", updateServicoDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteServico", {
      params: { id: id },
    });
    return response;
  }
}
