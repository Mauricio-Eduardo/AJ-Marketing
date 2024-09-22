import { api } from "../config/api";
import { CreateClienteDto } from "../models/cliente/dto/createCliente.dto";
import { DeleteClienteDto } from "../models/cliente/dto/deleteCliente.dto";
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

  async create(createClienteDto: CreateClienteDto) {
    const response = await api.post("PostCliente", createClienteDto);
    return String(response.data);
  }

  async update(updateClienteDto: UpdateClienteDto) {
    const response = await api.put("PutCliente", updateClienteDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteCliente", {
      params: {
        id: id,
      },
    });
    return String(response.data);
  }
}
