export class Contrato {
  id: number;
  cliente_id: number;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  proposta_id: number;
  total: string;
  condPag_id: number;
  condicaoPagamento: string;
  data_contrato: string;
  situacao: string;

  servicos: {
    servico_id: number;
    quantidade: number;
    valor_unitario: string;
    desconto: string;
    valor_total: string;
  }[];

  constructor(
    pId: number,
    pCliente_id: number,
    pCpf_cnpj: string,
    pNome_razaoSocial: string,
    pProposta_id: number,
    pTotal: string,
    pCondPag_id: number,
    pCondicaoPagamento: string,
    pData_contrato: string,
    pSituacao: string,
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
    this.cpf_cnpj = pCpf_cnpj;
    this.nome_razaoSocial = pNome_razaoSocial;
    this.proposta_id = pProposta_id;
    this.total = pTotal;
    this.condPag_id = pCondPag_id;
    this.condicaoPagamento = pCondicaoPagamento;
    this.data_contrato = pData_contrato;
    this.situacao = pSituacao;
    this.servicos = pServicos;
  }
}
