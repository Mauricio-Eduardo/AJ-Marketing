
namespace api.Models.CondicaoPagamento
{
    public class CondicaoPagamentoValoresModel
    {
        private decimal _desconto;
        private decimal _juros;
        private decimal _multa;

        // Propriedades públicas para acessar as variáveis
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

        // Construtor sem parâmetros
        public CondicaoPagamentoValoresModel() { }

        // Construtor com parâmetros
        public CondicaoPagamentoValoresModel(decimal desconto, decimal juros, decimal multa)
        {
            _desconto = desconto;
            _juros = juros; 
            _multa = multa;
        }
    }
}
