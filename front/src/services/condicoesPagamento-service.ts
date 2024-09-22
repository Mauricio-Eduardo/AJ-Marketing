import { api } from "../config/api";
import { CreateCondicaoPagamentoDto } from "../models/condicaoPagamento/dto/createCondicaoPagamento.dto";
import { UpdateCondicaoPagamentoDto } from "../models/condicaoPagamento/dto/updateCondicaoPagamento.dto";

export class CondicoesPagamentoService {
  async getAll() {
    const response = await api.get("GetAllCondicoesPagamento");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetCondicaoPagamento", {
      params: { id: pId },
    });
    return response.data;
  }

  async create(createCondicaoPagamentoDto: CreateCondicaoPagamentoDto) {
    const response = await api.post(
      "PostCondicaoPagamento",
      createCondicaoPagamentoDto
    );
    return String(response.data);
  }

  async update(updateCondicaoPagamentoDto: UpdateCondicaoPagamentoDto) {
    const response = await api.put(
      "PutCondicaoPagamento",
      updateCondicaoPagamentoDto
    );
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteCondicaoPagamento", {
      params: { id: id },
    });
    return String(response.data);
  }
}
