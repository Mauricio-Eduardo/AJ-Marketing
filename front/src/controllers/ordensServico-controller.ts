import { UpdateOrdemServicoDto } from "../models/ordemServico/dto/updateOrdemServico.dto";
import { OrdensServicoService } from "../services/ordensServico-service";

export class OrdensServicoController {
  private service: OrdensServicoService;

  constructor() {
    this.service = new OrdensServicoService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async update(updateOrdemServicoDto: UpdateOrdemServicoDto) {
    return await this.service.update(updateOrdemServicoDto);
  }
}
