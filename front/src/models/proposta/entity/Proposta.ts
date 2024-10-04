export class Proposta {
  id: number;
  cliente_id: number | null;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  tipo_pessoa: string;
  peridiocidade_id: number;
  descricao: string;
  data_proposta: string;
  prazo_final: string;
  data_inicio: string;
  total: string;
  situacao: string;
  data_ult_alt: string;
  data_cadastro: string;

  servicos: {
    servico_id: number;
    quantidade: number;
    valor_unitario: string;
    desconto: string;
    valor_total: string;
  }[];

  constructor(
    pId: number,
    pCliente_id: number | null,
    pTipo_pessoa: string,
    pCpf_cnpj: string,
    pNome_razaoSocial: string,
    pPeridiocidade_id: number,
    pDescricao: string,
    pData_proposta: string,
    pPrazo_final: string,
    pData_inicio: string,
    pTotal: string,
    pSituacao: string,
    pData_ult_alt: string,
    pData_cadastro: string,
    pServicos: {
      servico_id: number;
      quantidade: number;
      valor_unitario: string;
      desconto: string;
      valor_total: string;
    }[]
  ) {
    this.id = pId;
    this.cliente_id = pCliente_id;
    this.tipo_pessoa = pTipo_pessoa;
    this.cpf_cnpj = pCpf_cnpj;
    this.nome_razaoSocial = pNome_razaoSocial;
    this.peridiocidade_id = pPeridiocidade_id;
    this.descricao = pDescricao;
    this.data_proposta = pData_proposta;
    this.prazo_final = pPrazo_final;
    this.data_inicio = pData_inicio;
    this.total = pTotal;
    this.situacao = pSituacao;
    this.data_ult_alt = pData_ult_alt;
    this.data_cadastro = pData_cadastro;
    this.servicos = pServicos;
  }
}
