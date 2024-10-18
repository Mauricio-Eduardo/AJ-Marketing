export interface ControllerMethods {
  getAll: () => Promise<any[]>;
  getOne: (pId: number) => Promise<any>;
  create: (createDto: any) => Promise<any>;
  update: (updateDto: any) => Promise<any>;
  delete: (deleteDto: any) => Promise<any>;
}

export interface ClienteControllerMethods {
  getAll: () => Promise<any[]>;
  getOne: (pId: number) => Promise<any>;
  create: (createDto: any, proposta_id: number | null) => Promise<any>;
  update: (updateDto: any) => Promise<any>;
  delete: (id: number) => Promise<any>;
}

export interface PropostaControllerMethods {
  getAll: () => Promise<any[]>;
  getOne: (pId: number) => Promise<any>;
  create: (createDto: any) => Promise<any>;
  update: (updateDto: any) => Promise<any>;
  atualizarSituacao: (atualizarDto: any) => Promise<any>;
}

export interface ContratoControllerMethods {
  getAll: () => Promise<any[]>;
  getOne: (pId: number) => Promise<any>;
  create: (createDto: any) => Promise<any>;
  cancelar: (id: number) => Promise<any>;
}

export interface ContasReceberControllerMethods {
  getAll: () => Promise<any[]>;
  getOne: (pId: number) => Promise<any>;
  receber: (receberDto: any) => Promise<any>;
}
