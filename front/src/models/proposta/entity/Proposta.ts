export class Proposta {
  id: number;
  cliente_id: number;
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  condPag_id: number;
  condicaoPagamento: string;
  prazo_final: string;
  data_aprovacao: string | null;
  data_inicio: string | null;
  total: string;
  situacao: string;
  data_ult_alt: string;
  data_cadastro: string;

  servicos: {
    servico_id: number;
    servico: string;
    quantidade: number;
    valor_unitario: string;
    desconto: string;
    valor_total: string;
    peridiocidade_id: number;
    descricao: string;
    dias: number;
  }[];

  constructor(
    pId: number,
    pCliente_id: number,
    pTipo_pessoa: string,
    pCpf_cnpj: string,
    pNome_razaoSocial: string,
    pCondPag_id: number,
    pCondicaoPagamento: string,
    pPrazo_final: string,
    pData_aprovacao: string,
    pData_inicio: string,
    pTotal: string,
    pSituacao: string,
    pData_ult_alt: string,
    pData_cadastro: string,
    pServicos: {
      servico_id: number;
      servico: string;
      quantidade: number;
      valor_unitario: string;
      desconto: string;
      valor_total: string;
      peridiocidade_id: number;
      descricao: string;
      dias: number;
    }[]
  ) {
    this.id = pId;
    this.cliente_id = pCliente_id;
    this.tipo_pessoa = pTipo_pessoa;
    this.cpf_cnpj = pCpf_cnpj;
    this.nome_razaoSocial = pNome_razaoSocial;
    this.condPag_id = pCondPag_id;
    this.condicaoPagamento = pCondicaoPagamento;
    this.prazo_final = pPrazo_final;
    this.data_aprovacao = pData_aprovacao;
    this.data_inicio = pData_inicio;
    this.total = pTotal;
    this.situacao = pSituacao;
    this.data_ult_alt = pData_ult_alt;
    this.data_cadastro = pData_cadastro;
    this.servicos = pServicos;
  }
}
