import { api } from "../config/api";
import { AtualizaPropostaDto } from "../models/proposta/dto/atualizaProposta.dto";
import { CreatePropostaDto } from "../models/proposta/dto/createProposta.dto";
import { UpdatePropostaDto } from "../models/proposta/dto/updateProposta.dto";

export class PropostasService {
  async getAll() {
    const response = await api.get("GetAllPropostas");
    return response.data;
  }

  async getAllFiltered() {
    const response = await api.get("GetAllPropostasAprovadas");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetProposta", {
      params: { id: pId },
    });
    return response.data;
  }

  async create(createPropostaDto: CreatePropostaDto) {
    const response = await api.post("PostProposta", createPropostaDto);
    return String(response.data);
  }

  async update(updatePropostaDto: UpdatePropostaDto) {
    const response = await api.put("PutProposta", updatePropostaDto);
    return String(response.data);
  }

  async atualizarSituacao(atualizarPropostaDto: AtualizaPropostaDto) {
    const response = await api.put(
      "/AtualizarSituacaoProposta",
      atualizarPropostaDto
    );
    return String(response.data);
  }
}
