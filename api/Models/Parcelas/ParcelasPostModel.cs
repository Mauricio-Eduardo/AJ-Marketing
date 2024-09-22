namespace api.Models.Parcelas
{
    public class ParcelasPostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _numeroParcela;
        private int _dias;
        private decimal _porcentagem;

        private int _formaPag_id;

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

        public int FormaPag_id
        {
            get { return _formaPag_id; }
            set { _formaPag_id = value; }
        }

        // Construtor sem parâmetros
        public ParcelasPostModel() { }

        // Construtor com parâmetros
        public ParcelasPostModel(int numeroParcela, int dias, decimal porcentagem, int formaPag_id)
        {
            _numeroParcela = numeroParcela;
            _dias = dias;
            _porcentagem = porcentagem;
            _formaPag_id = formaPag_id;
        }
    }
}
