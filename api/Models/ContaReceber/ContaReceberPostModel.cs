namespace api.Models.ContaReceber
{
    public class ContaReceberPostModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _cliente_id;
        private int _contrato_id;
        private int _parcela_id;

        private DateTime _data_vencimento;

        private decimal _valor_inicial;
        private decimal _desconto;
        private decimal _juros;
        private decimal _multa;
        private decimal _total;

        // Propriedades públicas para acessar as variáveis
        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public int Contrato_id
        {
            get { return _contrato_id; }
            set { _contrato_id = value; }
        }

        public int Parcela_id
        {
            get { return _parcela_id; }
            set { _parcela_id = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        public decimal Valor_inicial
        {
            get { return _valor_inicial; }
            set { _valor_inicial = value; }
        }

        public decimal Desconto
        {
            get { return _desconto; }
            set { _desconto = value; }
        }

        public decimal Juros
        {
            get { return _juros; }
            set { _juros = value; }
        }

        public decimal Multa
        {
            get { return _multa; }
            set { _multa = value; }
        }

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        // Construtor sem parâmetros
        public ContaReceberPostModel() { }

        // Construtor com parâmetros
        public ContaReceberPostModel(int cliente_id, int contrato_id, int parcela_id, DateTime data_vencimento, decimal valor_inicial, decimal desconto, 
            decimal juros, decimal multa, decimal total)
        {
            _cliente_id = cliente_id;
            _contrato_id = contrato_id;
            _parcela_id = parcela_id;
            _data_vencimento = data_vencimento;
            _valor_inicial = valor_inicial;
            _desconto = desconto;
            _juros = juros;
            _multa = multa;
            _total = total;
        }
    }
}
