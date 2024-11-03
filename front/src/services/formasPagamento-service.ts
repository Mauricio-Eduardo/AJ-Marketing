import { AxiosResponse } from "axios";
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

  async create(
    createFormaPagamentoDto: CreateFormaPagamentoDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>(
      "PostFormaPagamento",
      createFormaPagamentoDto
    );
    return response;
  }

  async update(
    updateFormaPagamentoDto: UpdateFormaPagamentoDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put(
      "PutFormaPagamento",
      updateFormaPagamentoDto
    );
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteFormaPagamento", {
      params: { id: id },
    });
    return response;
  }
}
