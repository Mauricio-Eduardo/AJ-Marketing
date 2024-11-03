import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreatePaisDto } from "../models/pais/dto/createPais.dto";
import { UpdatePaisDto } from "../models/pais/dto/updatePais.dto";

export class PaisesService {
  async getAll() {
    const response = await api.get("GetAllPaises");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetPais", { params: { id: pId } });
    return response.data;
  }

  async create(createPaisDto: CreatePaisDto): Promise<AxiosResponse<string>> {
    const response = await api.post<string>("PostPais", createPaisDto);
    return response;
  }

  async update(updatePaisDto: UpdatePaisDto): Promise<AxiosResponse<string>> {
    const response = await api.put("PutPais", updatePaisDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeletePais", {
      params: { id: id },
    });
    return response;
  }
}
