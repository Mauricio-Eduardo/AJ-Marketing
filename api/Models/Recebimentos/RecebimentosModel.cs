namespace api.Models.Recebimentos
{
    public class RecebimentosModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        private int _formaPag_id;
        private string _formaPagamento; // Usado somente para exibir no Front

        private decimal _recebido;
        private decimal _juros;
        private decimal _multa;
        private decimal _desconto;
        private decimal _total;

        private DateTime _data_recebimento;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
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

        public DateTime Data_recebimento
        {
            get { return _data_recebimento; }
            set { _data_recebimento = value; }
        }

        // Construtor sem parâmetros
        public RecebimentosModel() { }

        // Construtor com parâmetros
        public RecebimentosModel(int id, int formaPag_id, string formaPagamento, decimal recebido, decimal juros, 
            decimal multa, decimal desconto, decimal total, DateTime data_recebimento)
        {
            _id = id;
            _formaPag_id = formaPag_id;
            _formaPagamento = formaPagamento;
            _recebido = recebido;
            _juros = juros;
            _multa = multa;
            _desconto = desconto;
            _total = total;
            _data_recebimento = data_recebimento;
        }
    }
}
