using api.Models.ModelPai;

namespace api.Models.FormaPagamento
{
    public class FormaPagamentoModel: Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _formaPag_ID;
        private string _formaPagamento;

        // Propriedades públicas para acessar as variáveis
        public int FormaPag_ID
        {
            get { return _formaPag_ID; }
            set { _formaPag_ID = value; }
        }

        public string FormaPagamento
        {
            get { return _formaPagamento; }
            set { _formaPagamento = value; }
        }

        // Construtor sem parâmetros
        public FormaPagamentoModel() { }

        // Construtor com parâmetros
        public FormaPagamentoModel(int formaPag_ID, string formaPagamento)
        {
            _formaPag_ID = formaPag_ID;
            _formaPagamento = formaPagamento;
        }
    }
}
