import { AxiosResponse } from "axios";
import { CreatePaisDto } from "../models/pais/dto/createPais.dto";
import { UpdatePaisDto } from "../models/pais/dto/updatePais.dto";
import { PaisesService } from "../services/paises-service";

export class PaisesController {
  private service: PaisesService;

  constructor() {
    this.service = new PaisesService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createPaisDto: CreatePaisDto): Promise<AxiosResponse<string>> {
    return await this.service.create(createPaisDto);
  }

  async update(updatePaisDto: UpdatePaisDto): Promise<AxiosResponse<string>> {
    return await this.service.update(updatePaisDto);
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    return await this.service.delete(id);
  }
}
