
namespace api.Models.ContaReceber
{
    public class ContaReceberModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private int _cliente_id;
        private int _contrato_id;
        private int _parcela_id;

        // Variáveis utilizadas somente para visualização
        private int _formaPag_id;
        private string _formaPagamento;
        private string _cpf_cnpj;
        private string _nome_razaoSocial;
        private int _quantidadeParcelas;
        private int _numeroParcela;

        private decimal _total;
        private DateTime _data_vencimento;

        private decimal _percentJuros;
        private decimal _jurosRecebido;

        private decimal _percentMulta;
        private decimal _multaRecebida;

        private decimal _percentDesconto;
        private decimal _descontoConcedido;

        private decimal _totalRecebido;
        private Nullable<DateTime> _data_recebimento;

        private string _situacao;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

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

        public int Contrato_id
        {
            get { return _contrato_id; }
            set { _contrato_id = value; }
        }

        public string Cpf_cnpj
        {
            get { return _cpf_cnpj; }
            set { _cpf_cnpj = value; }
        }

        public string Nome_razaoSocial
        {
            get { return _nome_razaoSocial; }
            set { _nome_razaoSocial = value; }
        }

        public int QuantidadeParcelas
        {
            get { return _quantidadeParcelas; }
            set { _quantidadeParcelas = value; }
        }

        public int NumeroParcela
        {
            get { return _numeroParcela; }
            set { _numeroParcela = value; }
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

        public decimal JurosRecebido
        {
            get { return _jurosRecebido; }
            set { _jurosRecebido = value; }
        }

        public decimal PercentMulta
        {
            get { return _percentMulta; }
            set { _percentMulta = value; }
        }

        public decimal MultaRecebida
        {
            get { return _multaRecebida; }
            set { _multaRecebida = value; }
        }

        public decimal PercentDesconto
        {
            get { return _percentDesconto; }
            set { _percentDesconto = value; }
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

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        public Nullable<DateTime> Data_recebimento
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
        public ContaReceberModel() { }

        // Construtor com parâmetros
        public ContaReceberModel(int id, int cliente_id, int contrato_id, int parcela_id, string cpf_cnpj, 
            string nome_razaoSocial, int quantidadeParcelas, int numeroParcela, int formaPag_id, string formaPagamento, 
            decimal total, decimal percentJuros, decimal jurosRecebido, decimal percentMulta, decimal multaRecebida, 
            decimal percentDesconto, decimal descontoConcedido, decimal totalRecebido, DateTime data_vencimento, 
            DateTime data_recebimento, string situacao)
        {
            _id = id;
            _cliente_id = cliente_id;
            _contrato_id = contrato_id;
            _parcela_id = parcela_id;
            _cpf_cnpj = cpf_cnpj;
            _nome_razaoSocial = nome_razaoSocial;
            _quantidadeParcelas = quantidadeParcelas;
            _numeroParcela = numeroParcela;
            _formaPag_id = formaPag_id;
            _formaPagamento = formaPagamento;
            _total = total;
            _data_vencimento = data_vencimento;
            _percentJuros = percentJuros;
            _jurosRecebido = jurosRecebido;
            _percentMulta = percentMulta;
            _multaRecebida = multaRecebida;
            _percentDesconto = percentDesconto;
            _descontoConcedido = descontoConcedido;
            _totalRecebido = totalRecebido;
            _data_recebimento = data_recebimento;
            _situacao = situacao;
        }
    }
}
