import { CreatePropostaDto } from "../models/proposta/dto/createProposta.dto";
import { UpdatePropostaDto } from "../models/proposta/dto/updateProposta.dto";
import { PropostasService } from "../services/propostas-service";

export class PropostasController {
  private service: PropostasService;

  constructor() {
    this.service = new PropostasService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createPropostaDto: CreatePropostaDto) {
    return await this.service.create(createPropostaDto);
  }

  async update(updatePropostaDto: UpdatePropostaDto) {
    return await this.service.update(updatePropostaDto);
  }

  async aprovar(id: number) {
    return await this.service.aprovar(id);
  }
}
