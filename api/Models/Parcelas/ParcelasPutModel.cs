namespace api.Models.Parcelas
{
    public class ParcelasPutModel
    {
        // Variáveis que podem ser alteradas
        private int _numeroParcela;
        private int _dias;
        private decimal _porcentagem;

        private int _formaPag_ID;

        // Propriedades públicas para acessar as variáveis
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

        public int FormaPag_ID
        {
            get { return _formaPag_ID; }
            set { _formaPag_ID = value; }
        }

        // Construtor sem parâmetros
        public ParcelasPutModel() { }

        // Construtor com parâmetros
        public ParcelasPutModel(int numeroParcela, int dias, decimal porcentagem, int formaPag_ID)
        {
            _numeroParcela = numeroParcela;
            _dias = dias;
            _porcentagem = porcentagem;
            _formaPag_ID = formaPag_ID;
        }
    }
}
