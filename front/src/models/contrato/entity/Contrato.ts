export class Contrato {
  id: number;
  cliente_id: number;
  tipo_pessoa: string;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  proposta_id: number;
  total: string;
  condicaoPagamento: string;
  data_contrato: string;
  data_vencimento: string;
  situacao: string;

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
    pProposta_id: number,
    pTotal: string,
    pCondicaoPagamento: string,
    pData_contrato: string,
    pData_vencimento: string,
    pSituacao: string,
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
    this.proposta_id = pProposta_id;
    this.total = pTotal;
    this.condicaoPagamento = pCondicaoPagamento;
    this.data_contrato = pData_contrato;
    this.data_vencimento = pData_vencimento;
    this.situacao = pSituacao;
    this.servicos = pServicos;
  }
}
