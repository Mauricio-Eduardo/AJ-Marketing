using api.Models.Parcelas;

namespace api.Models.CondicaoPagamento
{
    public class CondicaoPagamentoPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _condPag_ID; // o ID não é editável porém é necessário para a requisição do PUT
        private string _condicaoPagamento;
        private decimal _desconto;
        private decimal _juros;
        private decimal _multa;

        private List<ParcelasPutModel> _parcelas;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int CondPag_ID
        {
            get { return _condPag_ID; }
            set { _condPag_ID = value; }
        }

        public string CondicaoPagamento
        {
            get { return _condicaoPagamento; }
            set { _condicaoPagamento = value; }
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
        public CondicaoPagamentoPutModel(int condPag_ID, string condicaoPagamento, decimal desconto, decimal juros, decimal multa, List<ParcelasPutModel> parcelas, bool ativo)
        {
            _condPag_ID = condPag_ID;
            _condicaoPagamento = condicaoPagamento;
            _desconto = desconto;
            _juros = juros; 
            _multa = multa;
            _parcelas = parcelas;
            _ativo = ativo;
        }
    }
}
