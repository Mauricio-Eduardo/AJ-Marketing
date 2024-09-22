﻿using api.Models.ModelPai;
using api.Models.Parcelas;

namespace api.Models.CondicaoPagamento
{
    public class CondicaoPagamentoModel: Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _condicaoPagamento;
        private int _quantidadeParcelas;
        private decimal _desconto;
        private decimal _juros;
        private decimal _multa;

        private List<ParcelasModel> _parcelas;     

        // Propriedades públicas para acessar as variáveis
        public string CondicaoPagamento
        {
            get { return _condicaoPagamento; }
            set { _condicaoPagamento = value; }
        }

        public int QuantidadeParcelas
        {
            get { return _quantidadeParcelas;  }
            set { _quantidadeParcelas = value; }
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

        public List<ParcelasModel> Parcelas
        {
            get { return _parcelas; }
            set { _parcelas = value; }
        }

        // Construtor sem parâmetros
        public CondicaoPagamentoModel() { }

        // Construtor com parâmetros
        public CondicaoPagamentoModel(string condicaoPagamento, int quantidadeParcelas, decimal desconto, decimal juros, decimal multa, 
            List<ParcelasModel> parcelas)
        {
            _condicaoPagamento = condicaoPagamento;
            _quantidadeParcelas = quantidadeParcelas;
            _desconto = desconto;
            _juros = juros; 
            _multa = multa;
            _parcelas = parcelas;
        }
    }
}
