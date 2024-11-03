import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateEstadoDto } from "../models/estado/dto/createEstado.dto";
import { UpdateEstadoDto } from "../models/estado/dto/updateEstado.dto";

export class EstadosService {
  async getAll() {
    const response = await api.get("GetAllEstados");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetEstado", { params: { id: pId } });
    return response.data;
  }

  async create(
    createEstadoDto: CreateEstadoDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>("PostEstado", createEstadoDto);
    return response;
  }

  async update(
    updateEstadoDto: UpdateEstadoDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutEstado", updateEstadoDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteEstado", {
      params: { id: id },
    });
    return response;
  }
}
