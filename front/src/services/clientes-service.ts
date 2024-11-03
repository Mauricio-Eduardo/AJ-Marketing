import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateClienteDto } from "../models/cliente/dto/createCliente.dto";
import { UpdateClienteDto } from "../models/cliente/dto/updateCliente.dto";

export class ClientesService {
  async getAll() {
    const response = await api.get("GetAllClientes");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetCliente", { params: { id: pId } });
    return response.data;
  }

  async create(
    createClienteDto: CreateClienteDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.post<string>(`/PostCliente`, createClienteDto);
    return response;
  }

  async update(
    updateClienteDto: UpdateClienteDto
  ): Promise<AxiosResponse<string>> {
    const response = await api.put("PutCliente", updateClienteDto);
    return response;
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    const response = await api.delete("DeleteCliente", {
      params: {
        id: id,
      },
    });
    return response;
  }
}
