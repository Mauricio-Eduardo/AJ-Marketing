import { CreateOrigemDto } from "../models/origem/dto/createOrigem.dto";
import { UpdateOrigemDto } from "../models/origem/dto/updateOrigem.dto";
import { OrigensService } from "../services/origens-service";

export class OrigensController {
  private service: OrigensService;

  constructor() {
    this.service = new OrigensService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createOrigemDto: CreateOrigemDto) {
    return await this.service.create(createOrigemDto);
  }

  async update(updateOrigemDto: UpdateOrigemDto) {
    return await this.service.update(updateOrigemDto);
  }

  async delete(id: number) {
    return await this.service.delete(id);
  }
}
