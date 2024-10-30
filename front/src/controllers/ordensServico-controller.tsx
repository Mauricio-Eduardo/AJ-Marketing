import { UpdateOrdemServicoDto } from "../models/ordemServico/dto/updateOrdemServico.dto";
import { OrdensServicoService } from "../services/ordensServico-service";

export class OrdensServicoController {
  private service: OrdensServicoService;

  constructor() {
    this.service = new OrdensServicoService();
  }

  async getAll(situacao: string) {
    return await this.service.getAll(situacao);
  }

  async getAllPostados() {
    return await this.service.getAllPostados();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async update(updateOrdemServicoDto: UpdateOrdemServicoDto) {
    return await this.service.update(updateOrdemServicoDto);
  }

  async iniciarPausar(id: number, situacao: string) {
    return await this.service.iniciarPausar(id, situacao);
  }

  async entregar(id: number) {
    return await this.service.entregar(id);
  }

  async postar(id: number) {
    return await this.service.postar(id);
  }
}
