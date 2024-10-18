namespace api.Models.Recebimentos
{
    public class RecebimentosPostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _contaReceber_id;
        private int _formaPag_id;

        private decimal _recebido;
        private decimal _juros;
        private decimal _multa;
        private decimal _desconto;
        private decimal _total;
        private decimal _receber;

        private DateTime _data_recebimento;


        // Propriedades públicas para acessar as variáveis
          public int ContaReceber_id
        {
            get { return _contaReceber_id; }
            set { _contaReceber_id = value; }
        }

        public int FormaPag_id
        {
            get { return _formaPag_id; }
            set { _formaPag_id = value; }
        }

        public decimal Recebido
        {
            get { return _recebido; }
            set { _recebido = value; }
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

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        public decimal Receber
        {
            get { return _receber; }
            set { _receber = value; }
        }

        public DateTime Data_recebimento
        {
            get { return _data_recebimento; }
            set { _data_recebimento = value; }
        }

        // Construtor sem parâmetros
        public RecebimentosPostModel() { }

        // Construtor com parâmetros
        public RecebimentosPostModel(int contaReceber_id, int formaPag_id, decimal recebido, decimal juros, 
            decimal multa, decimal desconto, decimal total, decimal receber, DateTime data_recebimento)
        {
            _contaReceber_id = contaReceber_id;
            _formaPag_id = formaPag_id;
            _recebido = recebido;
            _juros = juros;
            _multa = multa;
            _desconto = desconto;
            _total = total;
            _receber = receber;
            _data_recebimento = data_recebimento;
        }
    }
}
