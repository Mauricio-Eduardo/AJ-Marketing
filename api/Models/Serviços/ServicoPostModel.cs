namespace api.Models.Serviços
{
    public class ServicoPostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _servico;
        private decimal _valor;
        private string _descricao;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
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

        // Construtor sem parâmetros
        public ServicoPostModel() { }

        // Construtor com parâmetros
        public ServicoPostModel(string servico, decimal valor, string descricao, bool ativo)
        {
            _servico = servico;
            _valor = valor;
            _descricao = descricao;
            _ativo = ativo;
        }
    }
}
