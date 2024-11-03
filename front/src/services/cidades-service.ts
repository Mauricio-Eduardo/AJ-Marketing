import { AxiosResponse } from "axios";
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

  async create(
    createCidadeDto: CreateCidadeDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>("PostCidade", createCidadeDto);
    return response;
  }

  async update(
    updateCidadeDto: UpdateCidadeDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutCidade", updateCidadeDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteCidade", {
      params: { id: id },
    });
    return response;
  }
}
