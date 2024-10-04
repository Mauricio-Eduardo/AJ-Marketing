
namespace api.Models.ContaReceber
{
    public class ContaReceberModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private int _cliente_id;
        private int _contrato_id;
        private int _parcela_id;

        // Variáveis utilizadas somente para visualização. Select das tabelas 'clientes' e 'condicoesPagamento'
        private string _cpf_cnpj;
        private string _nome_razaoSocial;
        private int _quantidadeParcelas;
        private int _numeroParcela;

        private DateTime _data_vencimento;

        private decimal _valor_inicial;
        private Nullable<decimal> _desconto;
        private Nullable<decimal> _juros;
        private Nullable<decimal> _multa;
        private decimal _total;

        private Nullable<decimal> _valor_pago;
        private Nullable<decimal> _valor_aberto;

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

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        public decimal Valor_inicial
        {
            get { return _valor_inicial; }
            set { _valor_inicial = value; }
        }

        public Nullable<decimal> Desconto
        {
            get { return _desconto; }
            set { _desconto = value; }
        }

        public Nullable<decimal> Juros
        {
            get { return _juros; }
            set { _juros = value; }
        }

        public Nullable<decimal> Multa
        {
            get { return _multa; }
            set { _multa = value; }
        }

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        public Nullable<decimal> Valor_pago
        {
            get { return _valor_pago; }
            set { _valor_pago = value; }
        }

        public Nullable<decimal> Valor_aberto
        {
            get { return _valor_aberto; }
            set { _valor_aberto = value; }
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
        public ContaReceberModel(int id, int cliente_id, int contrato_id, int parcela_id, string cpf_cnpj, string nome_razaoSocial, 
            int quantidadeParcelas, int numeroParcela, DateTime data_vencimento, decimal valor_inicial, decimal desconto, decimal juros, 
            decimal multa, decimal total, decimal valor_pago, decimal valor_aberto, DateTime data_recebimento, string situacao)
        {
            _id = id;
            _cliente_id = cliente_id;
            _contrato_id = contrato_id;
            _parcela_id = parcela_id;
            _cpf_cnpj = cpf_cnpj;
            _nome_razaoSocial = nome_razaoSocial;
            _quantidadeParcelas = quantidadeParcelas;
            _numeroParcela = numeroParcela;
            _data_vencimento = data_vencimento;
            _valor_inicial = valor_inicial;
            _desconto = desconto;
            _juros = juros;
            _multa = multa;
            _total = total;
            _valor_pago = valor_pago;
            _valor_aberto = valor_aberto;
            _data_recebimento = data_recebimento;
            _situacao = situacao;
        }
    }
}
