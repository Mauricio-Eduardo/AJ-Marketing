namespace api.Models.FormaPagamento
{
    public class FormaPagamentoPostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _formaPagamento;

        // Propriedades públicas para acessar as variáveis
        public string FormaPagamento
        {
            get { return _formaPagamento; }
            set { _formaPagamento = value; }
        }

        // Construtor sem parâmetros
        public FormaPagamentoPostModel() { }

        // Construtor com parâmetros
        public FormaPagamentoPostModel(string formaPagamento)
        {
            _formaPagamento = formaPagamento;
        }
    }
}
