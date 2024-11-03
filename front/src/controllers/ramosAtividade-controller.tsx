import { AxiosResponse } from "axios";
import { CreateRamoAtividadeDto } from "../models/ramoAtividade/dto/createRamoAtividade.dto";
import { UpdateRamoAtividadeDto } from "../models/ramoAtividade/dto/updateRamoAtividade.dto";
import { RamosAtividadeService } from "../services/ramosAtividade-service";

export class RamosAtividadeController {
  private service: RamosAtividadeService;

  constructor() {
    this.service = new RamosAtividadeService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(
    createRamoAtividadeDto: CreateRamoAtividadeDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.create(createRamoAtividadeDto);
  }

  async update(
    updateRamoAtividadeDto: UpdateRamoAtividadeDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.update(updateRamoAtividadeDto);
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    return await this.service.delete(id);
  }
}
