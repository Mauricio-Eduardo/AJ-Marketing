
namespace api.Models.ContaReceber
{
    public class ContaReceberPostModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _cliente_id;

        private decimal _total;
        private DateTime _data_vencimento;
        private decimal _percentJuros;
        private decimal _percentMulta;
        private decimal _percentDesconto;

        // Propriedades públicas para acessar as variáveis
        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        public decimal PercentJuros
        {
            get { return _percentJuros; }
            set { _percentJuros = value; }
        }

        public decimal PercentMulta
        {
            get { return _percentMulta; }
            set { _percentMulta = value; }
        }

        public decimal PercentDesconto
        {
            get { return _percentDesconto; }
            set { _percentDesconto = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        // Construtor sem parâmetros
        public ContaReceberPostModel() { }

        // Construtor com parâmetros
        public ContaReceberPostModel(int cliente_id, decimal total, decimal percentJuros, decimal percentMulta, 
            decimal percentDesconto, DateTime data_vencimento)
        {
            _cliente_id = cliente_id;
            _total = total;
            _data_vencimento = data_vencimento;
            _percentJuros = percentJuros;
            _percentMulta = percentMulta;
            _percentDesconto = percentDesconto;
        }
    }
}
