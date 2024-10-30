import { UpdateContaReceberDto } from "../models/contaReceber/dto/receberContaReceber.dto";
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

  async receber(updateContaReceberDto: UpdateContaReceberDto) {
    return await this.service.receber(updateContaReceberDto);
  }

  async reabrir(pId: number) {
    return await this.service.reabrir(pId);
  }
}
