import { api } from "../config/api";
import { CreateContratoDto } from "../models/contrato/dto/createContrato.dto";

export class ContratosService {
  async getAll() {
    const response = await api.get("GetAllContratos");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetContrato", {
      params: { id: pId },
    });
    return response.data;
  }

  async create(createContratoDto: CreateContratoDto) {
    const response = await api.post("PostContrato", createContratoDto);
    return String(response.data);
  }

  async cancelar(id: number) {
    const response = await api.put("CancelarContrato", {
      params: { id: id },
    });
    return String(response.data);
  }
}
