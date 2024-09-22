using api.Models.ModelPai;

namespace api.Models.FormaPagamento
{
    public class FormaPagamentoModel: Model
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
        public FormaPagamentoModel() { }

        // Construtor com parâmetros
        public FormaPagamentoModel(string formaPagamento)
        {
            _formaPagamento = formaPagamento;
        }
    }
}
