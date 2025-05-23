import { AxiosResponse } from "axios";
import { CreateCidadeDto } from "../models/cidade/dto/createCidade.dto";
import { UpdateCidadeDto } from "../models/cidade/dto/updateCidade.dto";
import { CidadesService } from "../services/cidades-service";

export class CidadesController {
  private service: CidadesService;

  constructor() {
    this.service = new CidadesService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(
    createCidadeDto: CreateCidadeDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.create(createCidadeDto);
  }

  async update(
    updateCidadeDto: UpdateCidadeDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.update(updateCidadeDto);
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    return await this.service.delete(id);
  }
}
