export class ContaReceber {
  id: number;
  cliente_id: number;
  cpf_cnpj: string;
  nome_razaoSocial: string;
  contrato_id: number;
  condicaoPagamento: string;
  parcela_id: number;
  numeroParcela: number;
  quantidadeParcelas: number;
  data_vencimento: string;
  valor_inicial: string;
  desconto: string;
  juros: string;
  multa: string;
  total: string;
  valor_pago: string;
  valor_aberto: string;
  data_recebimento: string;
  situacao: string;

  constructor(
    pId: number,
    pCliente_id: number,
    pCpf_cnpj: string,
    pNome_razaoSocial: string,
    pContrato_id: number,
    pCondicaoPagamento: string,
    pParcela_id: number,
    pNumeroParcela: number,
    pQuantidadeParcelas: number,
    pData_vencimento: string,
    pValor_inicial: string,
    pDesconto: string,
    pJuros: string,
    pMulta: string,
    pTotal: string,
    pValor_pago: string,
    pValor_aberto: string,
    pData_recebimento: string,
    pSituacao: string
  ) {
    this.id = pId;
    this.cliente_id = pCliente_id;
    this.cpf_cnpj = pCpf_cnpj;
    this.nome_razaoSocial = pNome_razaoSocial;
    this.contrato_id = pContrato_id;
    this.condicaoPagamento = pCondicaoPagamento;
    this.parcela_id = pParcela_id;
    this.numeroParcela = pNumeroParcela;
    this.quantidadeParcelas = pQuantidadeParcelas;
    this.data_vencimento = pData_vencimento;
    this.valor_inicial = pValor_inicial;
    this.desconto = pDesconto;
    this.juros = pJuros;
    this.multa = pMulta;
    this.total = pTotal;
    this.valor_pago = pValor_pago;
    this.valor_aberto = pValor_aberto;
    this.data_recebimento = pData_recebimento;
    this.situacao = pSituacao;
  }
}
