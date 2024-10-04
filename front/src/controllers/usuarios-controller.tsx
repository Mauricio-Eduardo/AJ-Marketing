import { CreateUsuarioDto } from "../models/usuario/dto/createUsuario.dto";
import { UpdateUsuarioDto } from "../models/usuario/dto/updateUsuario.dto";
import { UsuariosService } from "../services/usuarios-service";

export class UsuariosController {
  private service: UsuariosService;

  constructor() {
    this.service = new UsuariosService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.service.create(createUsuarioDto);
  }

  async update(updateUsuarioDto: UpdateUsuarioDto) {
    return await this.service.update(updateUsuarioDto);
  }

  async delete(id: number) {
    return await this.service.delete(id);
  }
}