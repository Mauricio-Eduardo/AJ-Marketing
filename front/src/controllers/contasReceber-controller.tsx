import { ReceberContaReceberDto } from "../models/contaReceber/dto/receberContaReceber.dto.ts";
import { ContasReceberService } from "../services/contaReceber-service";

export class ContasReceberController {
  private service: ContasReceberService;

  constructor() {
    this.service = new ContasReceberService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async receber(receberContaReceberDto: ReceberContaReceberDto) {
    return await this.service.receber(receberContaReceberDto);
  }
}
