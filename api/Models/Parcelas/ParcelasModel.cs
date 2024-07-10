namespace api.Models.Parcelas
{
    public class ParcelasModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _parcela_ID;
        private int _numeroParcela;
        private int _dias;
        private decimal _porcentagem;

        private int _condPag_ID;
        private int _formaPag_ID;
        private string _formaPagamento; // Usado somente para exibir no Front

        // Propriedades públicas para acessar as variáveis
        public int Parcela_ID
        {
            get { return _parcela_ID; }
            set { _parcela_ID = value; }
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

        public int CondPag_ID
        {
            get { return _condPag_ID; }
            set { _condPag_ID = value; }
        }

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
        public ParcelasModel() { }

        // Construtor com parâmetros
        public ParcelasModel(int parcela_ID, int numeroParcela, int dias, decimal porcentagem, int condPag_ID, int formaPag_ID, string formaPagamento)
        {
            _parcela_ID = parcela_ID;
            _numeroParcela = numeroParcela;
            _dias = dias;
            _porcentagem = porcentagem;
            _condPag_ID = condPag_ID;
            _formaPag_ID = formaPag_ID;
            _formaPagamento = formaPagamento;
        }
    }
}
