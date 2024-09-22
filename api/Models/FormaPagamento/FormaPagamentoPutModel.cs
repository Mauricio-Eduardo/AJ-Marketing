namespace api.Models.FormaPagamento
{
    public class FormaPagamentoPutModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        private string _formaPagamento;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
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
        public FormaPagamentoPutModel(int id, string formaPagamento, bool ativo)
        {
            _id = id;
            _formaPagamento = formaPagamento;
            _ativo = ativo;
        }
    }
}
