import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateInteresseDto } from "../models/interesse/dto/createInteresse.dto";
import { UpdateInteresseDto } from "../models/interesse/dto/updateInteresse.dto";

export class InteressesService {
  async getAll() {
    const response = await api.get("GetAllInteresses");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetInteresse", { params: { id: pId } });
    return response.data;
  }

  async create(
    createInteresseDto: CreateInteresseDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>(
      "PostInteresse",
      createInteresseDto
    );
    return response;
  }

  async update(
    updateInteresseDto: UpdateInteresseDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutInteresse", updateInteresseDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteInteresse", {
      params: { id: id },
    });
    return response;
  }
}
