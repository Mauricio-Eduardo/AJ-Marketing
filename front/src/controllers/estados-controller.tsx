import { CreateEstadoDto } from "../models/estado/dto/createEstado.dto";
import { UpdateEstadoDto } from "../models/estado/dto/updateEstado.dto";
import { EstadosService } from "../services/estados-service";

export class EstadosController {
  private service: EstadosService;

  constructor() {
    this.service = new EstadosService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createEstadoDto: CreateEstadoDto) {
    return await this.service.create(createEstadoDto);
  }

  async update(updateEstadoDto: UpdateEstadoDto) {
    return await this.service.update(updateEstadoDto);
  }

  async delete(id: number) {
    return await this.service.delete(id);
  }
}
