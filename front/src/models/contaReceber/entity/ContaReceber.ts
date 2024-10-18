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
  juros: string;
  multa: string;
  desconto: string;
  data_vencimento: string;
  situacao: string;

  recebimentos: {
    formaPag_id: number;
    formaPagamento: string;
    recebido: string;
    juros: string;
    multa: string;
    desconto: string;
    total: string;
    data_recebimento: string;
  }[];

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
    pJuros: string,
    pMulta: string,
    pDesconto: string,
    pData_vencimento: string,
    pSituacao: string,
    pRecebimentos: {
      formaPag_id: number;
      formaPagamento: string;
      recebido: string;
      juros: string;
      multa: string;
      desconto: string;
      total: string;
      data_recebimento: string;
    }[]
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
    this.juros = pJuros;
    this.multa = pMulta;
    this.desconto = pDesconto;
    this.data_vencimento = pData_vencimento;
    this.situacao = pSituacao;
    this.recebimentos = pRecebimentos;
  }
}
