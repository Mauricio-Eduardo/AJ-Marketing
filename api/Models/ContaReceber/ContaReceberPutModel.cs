namespace api.Models.ContaReceber
{
    public class ContaReceberPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT

        private decimal _juros;
        private decimal _multa;
        private decimal _desconto;
        private Nullable<decimal> _valor_pago;
        private Nullable<decimal> _valor_aberto;
        private DateTime _data_vencimento;
        private DateTime _data_recebimento;
        private string _situacao;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
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

        public decimal Desconto
        {
            get { return _desconto; }
            set { _desconto = value; }
        }

        public Nullable<decimal> Valor_pago
        {
            get { return _valor_pago; }
            set { _valor_pago = value; }
        }

        public Nullable<decimal> Valor_aberto
        {
            get { return _valor_aberto; }
            set { _valor_aberto = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        public DateTime Data_recebimento
        {
            get { return _data_recebimento; }
            set { _data_recebimento = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        // Construtor sem parâmetros
        public ContaReceberPutModel() { }

        // Construtor com parâmetros
        public ContaReceberPutModel(int id, decimal juros, decimal multa, decimal desconto, decimal valor_pago, decimal valor_aberto, 
            DateTime data_vencimento, DateTime data_recebimento, string situacao)
        {
            _id = id;
            _juros = juros;
            _multa = multa;
            _desconto = desconto;
            _valor_pago = valor_pago;
            _valor_aberto = valor_aberto;
            _data_vencimento = data_vencimento;
            _data_recebimento = data_recebimento;
            _situacao = situacao;
        }
    }
}
