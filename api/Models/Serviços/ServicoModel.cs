using System.Data.SqlTypes;

namespace api.Models.Serviços
{
    public class ServicoModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _servico_ID;
        private string _servico;
        private decimal _valor;
        private string _descricao;

        private bool _ativo;
        private DateTime _dataCadastro;
        private DateTime _dataUltAlt;

        // Propriedades públicas para acessar as variáveis
        public int Servico_ID
        {
            get { return _servico_ID; }
            set { _servico_ID = value; }
        }

        public string Servico
        {
            get { return _servico; }
            set { _servico = value; }
        }

        public decimal Valor
        {
            get { return _valor; }
            set { _valor = value; }
        }

        public string Descricao
        {
            get { return _descricao; }
            set { _descricao = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        public DateTime Data_cadastro
        {
            get { return _dataCadastro; }
            set { _dataCadastro = value; }
        }

        public DateTime Data_ult_alt
        {
            get { return _dataUltAlt; }
            set { _dataUltAlt = value; }
        }

        // Construtor sem parâmetros
        public ServicoModel() { }

        // Construtor com parâmetros
        public ServicoModel(int servico_ID, string servico, decimal valor, string descricao, bool ativo, DateTime data_cadastro, DateTime data_ult_alt)
        {
            _servico_ID = servico_ID;
            _servico = servico;
            _valor = valor;
            _descricao = descricao;
            _ativo = ativo;
            _dataCadastro = data_cadastro;
            _dataUltAlt = data_ult_alt;
        }
    }
}
