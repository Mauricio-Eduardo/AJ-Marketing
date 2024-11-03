import { AxiosResponse } from "axios";
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

  async create(
    createOrigemDto: CreateOrigemDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>("PostOrigem", createOrigemDto);
    return response;
  }

  async update(
    updateOrigemDto: UpdateOrigemDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutOrigem", updateOrigemDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteOrigem", {
      params: { id: id },
    });
    return response;
  }
}
