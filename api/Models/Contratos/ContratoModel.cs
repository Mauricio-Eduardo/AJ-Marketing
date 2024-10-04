﻿using api.Models.PropostaServico;

namespace api.Models.Contratos
{
    public class ContratoModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        private int _cliente_id;
        private int _proposta_id;
        private int _condPag_id;
        private DateTime _data_contrato;
        private DateTime _data_vencimento;
        private string _situacao;

        // Aqui são os atributos que serão exibidos no frontentd na tela de contratos mas que serão buscados das tabelas de 
        // 'condicoesPagamento', 'clientes', 'propostas' e 'propostas_servicos'
        private string _tipo_pessoa;
        private string _cpf_cnpj;
        private string _nome_razaoSocial;
        private decimal _total;
        private string _condicaoPagamento;
        private decimal _desconto;
        private decimal _juros;
        private decimal _multa;

        private List<PropostaServicoModel> _servicos;

        // Propriedades públicas para acessar as variáveis

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public int Proposta_id
        {
            get { return _proposta_id; }
            set { _proposta_id = value; }
        }

        public int CondPag_id
        {
            get { return _condPag_id; }
            set { _condPag_id = value; }
        }

        public DateTime Data_contrato
        {
            get { return _data_contrato; }
            set { _data_contrato = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        public string CondicaoPagamento
        {
            get { return _condicaoPagamento; }
            set { _condicaoPagamento = value; }
        }

        public string Tipo_pessoa
        {
            get { return _tipo_pessoa; }
            set { _tipo_pessoa = value; }
        }

        public string Cpf_cnpj
        {
            get { return _cpf_cnpj; }
            set { _cpf_cnpj = value; }
        }

        public string Nome_razaoSocial
        {
            get { return _nome_razaoSocial; }
            set { _nome_razaoSocial = value; }
        }

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        public decimal Desconto
        {
            get { return _desconto; }
            set { _desconto = value; }
        }

        public decimal Juros
        {
            get { return _juros; }
            set { _juros = value; }
        }

        public decimal Multa
        {
            get { return _multa; }
            set { _multa = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        public List<PropostaServicoModel> Servicos
        {
            get { return _servicos; }
            set { _servicos = value; }
        }

        // Construtor sem parâmetros
        public ContratoModel() { }

        // Construtor com parâmetros
        public ContratoModel(int id, int cliente_id, int proposta_id, int condPag_id, DateTime data_contrato, DateTime data_vencimento, 
            decimal total, string situacao, string condicaoPagamento, string tipo_pessoa, string cpf_cnpj, string nome_razaoSocial, 
            decimal desconto, decimal juros, decimal multa, List<PropostaServicoModel> servicos) 
        {
            _id = id;
            _cliente_id = cliente_id;
            _tipo_pessoa = tipo_pessoa;
            _proposta_id= proposta_id;
            _condPag_id= condPag_id;
            _data_contrato= data_contrato;
            _data_vencimento = data_vencimento;
            _situacao= situacao;
            _condicaoPagamento = condicaoPagamento;
            _cpf_cnpj = cpf_cnpj;
            _nome_razaoSocial = nome_razaoSocial;
            _total= total;
            _desconto= desconto;
            _juros = juros;
            _multa= multa;
            _servicos = servicos;
        }
    }
}