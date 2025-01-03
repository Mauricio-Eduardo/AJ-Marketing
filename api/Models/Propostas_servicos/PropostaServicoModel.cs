﻿namespace api.Models.PropostaServico
{
    public class PropostaServicoModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        private int _servico_id;
        private string _servico; // somente para exibição

        private int _peridiocidade_id;
        private string _descricao; // somente para exibição
        private int _dias; // somente para exibição

        private int _quantidade;
        private decimal _valor_unitario;
        private decimal _desconto;
        private decimal _valor_total;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public int Servico_id
        {
            get { return _servico_id; }
            set { _servico_id = value; }
        }

        public string Servico
        {
            get { return _servico; }
            set { _servico = value; }
        }

        public int Peridiocidade_id
        {
            get { return _peridiocidade_id; }
            set { _peridiocidade_id = value; }
        }

        public string Descricao
        {
            get { return _descricao; }
            set { _descricao = value; }
        }

        public int Dias
        {
            get { return _dias; }
            set { _dias = value; }
        }

        public int Quantidade
        {
            get { return _quantidade; }
            set { _quantidade = value; }
        }

        public decimal Valor_unitario
        {
            get { return _valor_unitario; }
            set { _valor_unitario = value; }
        }

        public decimal Desconto
        {
            get { return _desconto; }
            set { _desconto = value; }
        }

        public decimal Valor_total
        {
            get { return _valor_total; }
            set { _valor_total = value; }
        }

        // Construtor sem parâmetros
        public PropostaServicoModel() { }

        // Construtor com parâmetros
        public PropostaServicoModel(int id, int servico_id, string servico, int peridiocidade_id, string descricao, int dias, int quantidade, 
            decimal valor_unitario, decimal desconto, decimal valor_total)
        {
            _id = id;
            _servico_id = servico_id;
            _quantidade = quantidade;
            _peridiocidade_id = peridiocidade_id;
            _dias = dias;
            _descricao = descricao;
            _valor_unitario = valor_unitario;
            _valor_total = valor_total;
            _desconto = desconto;
            _servico = servico;
        }
    }
}
