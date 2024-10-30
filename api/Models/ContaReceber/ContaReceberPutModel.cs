
namespace api.Models.ContaReceber
{
    public class ContaReceberPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT

        private DateTime _data_vencimento;
        private decimal _jurosRecebido;
        private decimal _multaRecebida;
        private decimal _descontoConcedido;
        private decimal _totalRecebido;
        private DateTime _data_recebimento;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        public decimal JurosRecebido
        {
            get { return _jurosRecebido; }
            set { _jurosRecebido = value; }
        }

        public decimal MultaRecebida
        {
            get { return _multaRecebida; }
            set { _multaRecebida = value; }
        }

        public decimal DescontoConcedido
        {
            get { return _descontoConcedido; }
            set { _descontoConcedido = value; }
        }

        public decimal TotalRecebido
        {
            get { return _totalRecebido; }
            set { _totalRecebido = value; }
        }

        public DateTime Data_recebimento
        {
            get { return _data_recebimento; }
            set { _data_recebimento = value; }
        }

        // Construtor sem parâmetros
        public ContaReceberPutModel() { }

        // Construtor com parâmetros
        public ContaReceberPutModel(int id, DateTime data_vencimento, decimal jurosRecebido, decimal multaRecebida, 
            decimal descontoConcedido, decimal totalRecebido, DateTime data_recebimento)
        {
            _id = id;
            _data_vencimento = data_vencimento;
            _jurosRecebido = jurosRecebido;
            _multaRecebida = multaRecebida;
            _descontoConcedido = descontoConcedido;
            _totalRecebido = totalRecebido;
            _data_recebimento = data_recebimento;
        }
    }
}
