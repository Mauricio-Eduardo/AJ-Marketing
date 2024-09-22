namespace api.Models.Serviços
{
    public class ServicoPostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _servico;
        private decimal _valor;
        private string _descricao;

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

        // Construtor sem parâmetros
        public ServicoPostModel() { }

        // Construtor com parâmetros
        public ServicoPostModel(string servico, decimal valor, string descricao)
        {
            _servico = servico;
            _valor = valor;
            _descricao = descricao;
        }
    }
}
