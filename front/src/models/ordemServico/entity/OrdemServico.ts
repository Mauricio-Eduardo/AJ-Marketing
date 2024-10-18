export class OrdemServico {
  id: number;
  cliente_id: number;
  nome_razaoSocial: string;
  contrato_id: number;
  usuario_id: number | null;
  nome: string;
  servico_id: number;
  servico: string;

  data_prazo: string;
  data_entrega: string | null;

  tema: string;
  situacao: string;
  postado: string;
  referencia: string;

  data_cadastro: string;
  data_ult_alt: string;

  constructor(
    pId: number,
    pCliente_id: number,
    pNome_razaoSocial: string,
    pContrato_id: number,
    pUsuario_id: number | null,
    pNome: string,
    pServico_id: number,
    pServico: string,
    pData_prazo: string,
    pData_entrega: string | null,
    pTema: string,
    pSituacao: string,
    pPostado: string,
    pReferencia: string,
    pData_cadastro: string,
    pData_ult_alt: string
  ) {
    (this.id = pId),
      (this.cliente_id = pCliente_id),
      (this.nome_razaoSocial = pNome_razaoSocial),
      (this.contrato_id = pContrato_id),
      (this.usuario_id = pUsuario_id),
      (this.nome = pNome),
      (this.servico_id = pServico_id),
      (this.servico = pServico),
      (this.data_prazo = pData_prazo),
      (this.data_entrega = pData_entrega),
      (this.tema = pTema),
      (this.situacao = pSituacao),
      (this.postado = pPostado),
      (this.referencia = pReferencia),
      (this.data_cadastro = pData_cadastro),
      (this.data_ult_alt = pData_ult_alt);
  }
}
