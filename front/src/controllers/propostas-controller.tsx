import { AtualizaPropostaDto } from "../models/proposta/dto/atualizaProposta.dto";
import { CreatePropostaDto } from "../models/proposta/dto/createProposta.dto";
import { UpdatePropostaDto } from "../models/proposta/dto/updateProposta.dto";
import { Proposta } from "../models/proposta/entity/Proposta";
import { PropostasService } from "../services/propostas-service";

export class PropostasController {
  private service: PropostasService;

  constructor() {
    this.service = new PropostasService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getAllFiltered() {
    return await this.service.getAllFiltered();
  }

  async getOne(pId: number): Promise<Proposta> {
    return await this.service.getOne(pId);
  }

  async create(createPropostaDto: CreatePropostaDto) {
    return await this.service.create(createPropostaDto);
  }

  async update(updatePropostaDto: UpdatePropostaDto) {
    return await this.service.update(updatePropostaDto);
  }

  async atualizarSituacao(atualizarPropostaDto: AtualizaPropostaDto) {
    return await this.service.atualizarSituacao(atualizarPropostaDto);
  }
}
