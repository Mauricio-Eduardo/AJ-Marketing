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

  async create(createUsuarioDto: CreateUsuarioDto) {
    const response = await api.post("PostUsuario", createUsuarioDto);
    return String(response.data);
  }

  async update(updateUsuarioDto: UpdateUsuarioDto) {
    const response = await api.put("PutUsuario", updateUsuarioDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteUsuario", {
      params: { id: id },
    });
    return String(response.data);
  }
}
