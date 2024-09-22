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

  async create(createInteresseDto: CreateInteresseDto) {
    const response = await api.post("PostInteresse", createInteresseDto);
    return String(response.data);
  }

  async update(updateInteresseDto: UpdateInteresseDto) {
    const response = await api.put("PutInteresse", updateInteresseDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteInteresse", {
      params: { id: id },
    });
    return String(response.data);
  }
}
