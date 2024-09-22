import { api } from "../config/api";
import { CreateEstadoDto } from "../models/estado/dto/createEstado.dto";
import { UpdateEstadoDto } from "../models/estado/dto/updateEstado.dto";

export class EstadosService {
  async getAll() {
    const response = await api.get("GetAllEstados");
    return response.data;
  }

  async getOne(pId: number) {
    const response = await api.get("GetEstado", { params: { id: pId } });
    return response.data;
  }

  async create(createEstadoDto: CreateEstadoDto) {
    const response = await api.post("PostEstado", createEstadoDto);
    return String(response.data);
  }

  async update(updateEstadoDto: UpdateEstadoDto) {
    const response = await api.put("PutEstado", updateEstadoDto);
    return String(response.data);
  }

  async delete(id: number) {
    const response = await api.delete("DeleteEstado", {
      params: { id: id },
    });
    return String(response.data);
  }
}
