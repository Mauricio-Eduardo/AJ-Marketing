import { CreateCondicaoPagamentoDto } from "../models/condicaoPagamento/dto/createCondicaoPagamento.dto";
import { UpdateCondicaoPagamentoDto } from "../models/condicaoPagamento/dto/updateCondicaoPagamento.dto";
import { CondicoesPagamentoService } from "../services/condicoesPagamento-service";

export class CondicoesPagamentoController {
  private service: CondicoesPagamentoService;

  constructor() {
    this.service = new CondicoesPagamentoService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createCondicaoPagamentoDto: CreateCondicaoPagamentoDto) {
    return await this.service.create(createCondicaoPagamentoDto);
  }

  async update(updateCondicaoPagamentoDto: UpdateCondicaoPagamentoDto) {
    return await this.service.update(updateCondicaoPagamentoDto);
  }

  async delete(id: number) {
    return await this.service.delete(id);
  }
}
