import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreatePeridiocidadeDto } from "../models/peridiocidade/dto/createPeridiocidade.dto";
import { UpdatePeridiocidadeDto } from "../models/peridiocidade/dto/updatePeridiocidade.dto";

export class PeridiocidadesService {
  async getAll() {
    const response = await api.get("GetAllPeridiocidades");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetPeridiocidade", { params: { id: pId } });
    return response.data;
  }

  async create(
    createPeridiocidadeDto: CreatePeridiocidadeDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>(
      "PostPeridiocidade",
      createPeridiocidadeDto
    );
    return response;
  }

  async update(
    updatePeridiocidadeDto: UpdatePeridiocidadeDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutPeridiocidade", updatePeridiocidadeDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeletePeridiocidade", {
      params: { id: id },
    });
    return response;
  }
}
