export class ContaReceber {
  id: number;
  cliente_id: number;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  contrato_id: number;
  parcela_id: number;
  numeroParcela: number;
  quantidadeParcelas: number;
  formaPag_id: number;
  formaPagamento: string;
  total: string;
  data_vencimento: string;
  percentJuros: string;
  jurosRecebido: string;
  percentMulta: string;
  multaRecebida: string;
  percentDesconto: string;
  descontoConcedido: string;
  totalRecebido: string;
  data_recebimento: string;
  situacao: string;

  constructor(
    pId: number,
    pCliente_id: number,
    pCpf_cnpj: string,
    pNome_razaoSocial: string,
    pContrato_id: number,
    pParcela_id: number,
    pNumeroParcela: number,
    pQuantidadeParcelas: number,
    pFormaPag_id: number,
    pFormaPagamento: string,
    pTotal: string,
    pData_vencimento: string,
    pPercentJuros: string,
    pJurosRecebido: string,
    pPercentMulta: string,
    pMultaRecebida: string,
    pPercentDesconto: string,
    pDescontoConcedido: string,
    pTotalRecebido: string,
    pData_recebimento: string,
    pSituacao: string
  ) {
    this.id = pId;
    this.cliente_id = pCliente_id;
    this.cpf_cnpj = pCpf_cnpj;
    this.nome_razaoSocial = pNome_razaoSocial;
    this.contrato_id = pContrato_id;
    this.parcela_id = pParcela_id;
    this.numeroParcela = pNumeroParcela;
    this.quantidadeParcelas = pQuantidadeParcelas;
    this.formaPag_id = pFormaPag_id;
    this.formaPagamento = pFormaPagamento;
    this.total = pTotal;
    this.data_vencimento = pData_vencimento;
    this.percentJuros = pPercentJuros;
    this.jurosRecebido = pJurosRecebido;
    this.percentMulta = pPercentMulta;
    this.multaRecebida = pMultaRecebida;
    this.percentDesconto = pPercentDesconto;
    this.descontoConcedido = pDescontoConcedido;
    this.totalRecebido = pTotalRecebido;
    this.data_recebimento = pData_recebimento;
    this.situacao = pSituacao;
  }
}
