import { api } from "../config/api";
import { CreateFormaPagamentoDto } from "../models/formaPagamento/dto/createFormaPagamento.dto";
import { UpdateFormaPagamentoDto } from "../models/formaPagamento/dto/updateFormaPagamento.dto";

export class FormasPagamentoService {
  async getAll() {
    const response = await api.get("GetAllFormasPagamento");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetFormaPagamento", {
      params: { id: pId },
    });
    return response.data;
  }

  async create(createFormaPagamentoDto: CreateFormaPagamentoDto) {
    const response = await api.post(
      "PostFormaPagamento",
      createFormaPagamentoDto
    );
    return String(response.data);
  }

  async update(updateFormaPagamentoDto: UpdateFormaPagamentoDto) {
    const response = await api.put(
      "PutFormaPagamento",
      updateFormaPagamentoDto
    );
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteFormaPagamento", {
      params: { id: id },
    });
    return String(response.data);
  }
}
