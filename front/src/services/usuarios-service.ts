import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateUsuarioDto } from "../models/usuario/dto/createUsuario.dto";
import { UpdateUsuarioDto } from "../models/usuario/dto/updateUsuario.dto";

export class UsuariosService {
  async getAll() {
    const response = await api.get("GetAllUsuarios");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetUsuario", { params: { id: pId } });
    return response.data;
  }

  async create(
    createUsuarioDto: CreateUsuarioDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>("PostUsuario", createUsuarioDto);
    return response;
  }

  async update(
    updateUsuarioDto: UpdateUsuarioDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutUsuario", updateUsuarioDto);
    return response;
  }

  async delete(
    id: number,
    novoUsuario_id: number
  ): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteUsuario", {
      params: { id: id, novoUsuario_id: novoUsuario_id },
    });
    return response;
  }
}
