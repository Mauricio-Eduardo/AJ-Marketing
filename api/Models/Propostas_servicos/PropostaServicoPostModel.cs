
namespace api.Models.PropostaServico
{
    public class PropostaServicoPostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _servico_id;
        private int _peridiocidade_id;

        private int _quantidade;
        private decimal _valor_unitario;
        private decimal _desconto;
        private decimal _valor_total;

        // Propriedades públicas para acessar as variáveis
        public int Servico_id
        {
            get { return _servico_id; }
            set { _servico_id = value; }
        }

        public int Peridiocidade_id
        {
            get { return _peridiocidade_id; }
            set { _peridiocidade_id = value; }
        }

        public int Quantidade
        {
            get { return _quantidade; }
            set { _quantidade = value; }
        }

        public decimal Valor_unitario
        {
            get { return _valor_unitario; }
            set { _valor_unitario = value; }
        }

        public decimal Desconto
        {
            get { return _desconto; }
            set { _desconto = value; }
        }

        public decimal Valor_total
        {
            get { return _valor_total; }
            set { _valor_total = value; }
        }

        // Construtor sem parâmetros
        public PropostaServicoPostModel() { }

        // Construtor com parâmetros
        public PropostaServicoPostModel(int servico_id, int peridiocidade_id, int quantidade, decimal valor_unitario, decimal desconto, 
            decimal valor_total)
        {
            _servico_id = servico_id;
            _peridiocidade_id = peridiocidade_id;
            _quantidade = quantidade;
            _valor_unitario = valor_unitario;
            _valor_total = valor_total;
            _desconto = desconto;
        }
    }
}
