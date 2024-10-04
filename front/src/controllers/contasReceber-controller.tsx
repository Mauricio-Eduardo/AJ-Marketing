import { UpdateContaReceberDto } from "../models/contaReceber/dto/updateContaReceber.DTO";
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

  async update(updateContaReceberDto: UpdateContaReceberDto) {
    return await this.service.update(updateContaReceberDto);
  }
}
