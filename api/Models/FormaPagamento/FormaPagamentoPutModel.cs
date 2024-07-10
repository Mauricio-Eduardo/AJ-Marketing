namespace api.Models.FormaPagamento
{
    public class FormaPagamentoPutModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _formaPag_ID;
        private string _formaPagamento;

        private bool _ativo;

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

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public FormaPagamentoPutModel() { }

        // Construtor com parâmetros
        public FormaPagamentoPutModel(int formaPag_ID, string formaPagamento, bool ativo)
        {
            _formaPag_ID = formaPag_ID;
            _formaPagamento = formaPagamento;
            _ativo = ativo;
        }
    }
}
