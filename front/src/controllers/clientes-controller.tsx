import { AxiosResponse } from "axios";
import { CreateClienteDto } from "../models/cliente/dto/createCliente.dto";
import { UpdateClienteDto } from "../models/cliente/dto/updateCliente.dto";
import { ClientesService } from "../services/clientes-service";

export class ClientesController {
  private service: ClientesService;

  constructor() {
    this.service = new ClientesService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(
    createClienteDto: CreateClienteDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.create(createClienteDto);
  }

  async update(
    updateClienteDto: UpdateClienteDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.update(updateClienteDto);
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    return await this.service.delete(id);
  }
}
