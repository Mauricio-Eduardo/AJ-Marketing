import { CreateContratoDto } from "../models/contrato/dto/createContrato.dto";
import { ContratosService } from "../services/contratos-service";

export class ContratosController {
  private service: ContratosService;

  constructor() {
    this.service = new ContratosService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(createContratoDto: CreateContratoDto) {
    return await this.service.create(createContratoDto);
  }

  async cancelar(id: number) {
    return await this.service.cancelar(id);
  }
}
