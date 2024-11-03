import { AxiosResponse } from "axios";
import { CreateInteresseDto } from "../models/interesse/dto/createInteresse.dto";
import { UpdateInteresseDto } from "../models/interesse/dto/updateInteresse.dto";
import { InteressesService } from "../services/interesses-service";

export class InteressesController {
  private service: InteressesService;

  constructor() {
    this.service = new InteressesService();
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getOne(pId: number) {
    return await this.service.getOne(pId);
  }

  async create(
    createInteresseDto: CreateInteresseDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.create(createInteresseDto);
  }

  async update(
    updateInteresseDto: UpdateInteresseDto
  ): Promise<AxiosResponse<string>> {
    return await this.service.update(updateInteresseDto);
  }

  async delete(id: number): Promise<AxiosResponse<string>> {
    return await this.service.delete(id);
  }
}
