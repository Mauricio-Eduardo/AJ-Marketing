namespace api.Models.ContaReceber
{
    public class ContaReceberPostModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _cliente_id;
        private int _parcela_id;

        private decimal _total;
        private DateTime _data_vencimento;

        // Propriedades públicas para acessar as variáveis
        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public int Parcela_id
        {
            get { return _parcela_id; }
            set { _parcela_id = value; }
        }

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }
        // Construtor sem parâmetros
        public ContaReceberPostModel() { }

        // Construtor com parâmetros
        public ContaReceberPostModel(int cliente_id, int parcela_id, decimal total, DateTime data_vencimento)
        {
            _cliente_id = cliente_id;
            _parcela_id = parcela_id;
            _total = total;
            _data_vencimento = data_vencimento;
        }
    }
}
