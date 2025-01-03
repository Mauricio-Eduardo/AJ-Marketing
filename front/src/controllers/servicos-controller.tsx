import { AxiosResponse } from "axios";
import { CreateServicoDto } from "../models/servico/dto/createServico.dto";
import { UpdateServicoDto } from "../models/servico/dto/updateServico.dto";
import { ServicosService } from "../services/servicos-service";

export class ServicosController {
  private service: ServicosService;

  constructor() {
    this.service = new ServicosService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(
    createServicoDto: CreateServicoDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.create(createServicoDto);
  }

  async update(
    updateServicoDto: UpdateServicoDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.update(updateServicoDto);
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    return await this.service.delete(id);
  }
}
