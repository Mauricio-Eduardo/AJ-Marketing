import { AxiosResponse } from "axios";
import { CreateFormaPagamentoDto } from "../models/formaPagamento/dto/createFormaPagamento.dto";
import { UpdateFormaPagamentoDto } from "../models/formaPagamento/dto/updateFormaPagamento.dto";
import { FormasPagamentoService } from "../services/formasPagamento-service";

export class FormasPagamentoController {
  private service: FormasPagamentoService;

  constructor() {
    this.service = new FormasPagamentoService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(
    createFormaPagamentoDto: CreateFormaPagamentoDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.create(createFormaPagamentoDto);
  }

  async update(
    updateFormaPagamentoDto: UpdateFormaPagamentoDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.update(updateFormaPagamentoDto);
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    return await this.service.delete(id);
  }
}
