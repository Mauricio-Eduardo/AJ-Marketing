using api.Models.Parcelas;

namespace api.Models.CondicaoPagamento
{
    public class CondicaoPagamentoPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _condicaoPagamento;
        private int _quantidadeParcelas;
        private decimal _desconto;
        private decimal _juros;
        private decimal _multa;

        private List<ParcelasPutModel> _parcelas;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string CondicaoPagamento
        {
            get { return _condicaoPagamento; }
            set { _condicaoPagamento = value; }
        }

        public int QuantidadeParcelas
        {
            get { return _quantidadeParcelas; }
            set { _quantidadeParcelas = value; }
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

        public List<ParcelasPutModel> Parcelas
        {
            get { return _parcelas; }
            set { _parcelas = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public CondicaoPagamentoPutModel() { }

        // Construtor com parâmetros
        public CondicaoPagamentoPutModel(int id, string condicaoPagamento, int quantidadeParcelas, decimal desconto, decimal juros, decimal multa, List<ParcelasPutModel> parcelas, bool ativo)
        {
            _id = id;
            _condicaoPagamento = condicaoPagamento;
            _quantidadeParcelas = quantidadeParcelas;
            _desconto = desconto;
            _juros = juros; 
            _multa = multa;
            _parcelas = parcelas;
            _ativo = ativo;
        }
    }
}
