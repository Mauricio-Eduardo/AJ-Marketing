namespace api.Models.Parcelas
{
    public class ParcelasModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        private int _numeroParcela;
        private int _dias;
        private decimal _porcentagem;

        private int _condPag_id;
        private int _formaPag_id;
        private string _formaPagamento; // Usado somente para exibir no Front

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public int NumeroParcela
        {
            get { return _numeroParcela; }
            set { _numeroParcela = value; }
        }

        public int Dias
        {
            get { return _dias; }
            set { _dias = value; }
        }

        public decimal Porcentagem
        {
            get { return _porcentagem; }
            set { _porcentagem = value; }
        }

        public int CondPag_id
        {
            get { return _condPag_id; }
            set { _condPag_id = value; }
        }

        public int FormaPag_id
        {
            get { return _formaPag_id; }
            set { _formaPag_id = value; }
        }

        public string FormaPagamento
        {
            get { return _formaPagamento; }
            set { _formaPagamento = value; }
        }

        // Construtor sem parâmetros
        public ParcelasModel() { }

        // Construtor com parâmetros
        public ParcelasModel(int id, int numeroParcela, int dias, decimal porcentagem, int condPag_id, int formaPag_id, string formaPagamento)
        {
            _id = id;
            _numeroParcela = numeroParcela;
            _dias = dias;
            _porcentagem = porcentagem;
            _condPag_id = condPag_id;
            _formaPag_id = formaPag_id;
            _formaPagamento = formaPagamento;
        }
    }
}
