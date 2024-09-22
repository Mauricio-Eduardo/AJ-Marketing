import { CreatePeridiocidadeDto } from "../models/peridiocidade/dto/createPeridiocidade.dto";
import { UpdatePeridiocidadeDto } from "../models/peridiocidade/dto/updatePeridiocidade.dto";
import { PeridiocidadesService } from "../services/peridiocidades-service";

export class PeridiocidadesController {
  private service: PeridiocidadesService;

  constructor() {
    this.service = new PeridiocidadesService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createPeridiocidadeDto: CreatePeridiocidadeDto) {
    return await this.service.create(createPeridiocidadeDto);
  }

  async update(updatePeridiocidadeDto: UpdatePeridiocidadeDto) {
    return await this.service.update(updatePeridiocidadeDto);
  }

  async delete(id: number) {
    return await this.service.delete(id);
  }
}
