using api.Models.PropostaServico;

namespace api.Models.Proposta
{
    public class PropostaModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        
        // peridiocidades table
        private int _peridiocidade_id;
        private string _descricao; // Somente para exibição
        private int _dias; // Somente para exibição

        //clientes table
        private Nullable<int> _cliente_id;
        private string _tipo_pessoa;
        private string _cpf_cnpj;
        private string _nome_razaoSocial;

        private DateTime _data_proposta;
        private DateTime _prazo_final;
        private DateTime _data_inicio;
        
        private decimal _total;
        private string _situacao;

        private Nullable<DateTime> _data_ult_alt;
        private DateTime _data_cadastro;

        private List<PropostaServicoModel> _servicos;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public int Peridiocidade_id
        {
            get { return _peridiocidade_id; }
            set { _peridiocidade_id = value; }
        }

        public string Descricao
        {
            get { return _descricao; }
            set { _descricao = value; }
        }

        public int Dias
        {
            get { return _dias; }
            set { _dias = value; }
        }

        public int? Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public string Tipo_pessoa
        {
            get { return _tipo_pessoa; }
            set { _tipo_pessoa = value; }
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

        public DateTime Data_proposta
        {
            get { return _data_proposta; }
            set { _data_proposta = value; }
        }

        public DateTime Prazo_final
        {
            get { return _prazo_final; }
            set { _prazo_final = value; }
        }

        public DateTime Data_inicio
        {
            get { return _data_inicio; }
            set { _data_inicio = value; }
        }

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        public DateTime ?Data_ult_alt
        {
            get { return _data_ult_alt; }
            set { _data_ult_alt = value; }
        }

        public DateTime Data_cadastro
        {
            get { return _data_cadastro; }
            set { _data_cadastro = value; }
        }

        public List<PropostaServicoModel> Servicos
        {
            get { return _servicos; }
            set { _servicos = value; }
        }

        // Construtor sem parâmetros
        public PropostaModel() { }

        // Construtor com parâmetros
        public PropostaModel(int id, int peridiocidade_id, string descricao, int dias, int cliente_id, string tipo_pessoa, string cpf_cnpj, string nome_razaoSocial, 
            DateTime data_proposta, DateTime prazo_final, DateTime data_inicio, decimal total, string situacao,
            Nullable<DateTime> data_ult_alt, DateTime data_cadastro, List<PropostaServicoModel> servicos)
        {
            _id = id;
            _peridiocidade_id = peridiocidade_id;
            _descricao = descricao;
            _dias = dias;
            _cliente_id = cliente_id;
            _tipo_pessoa = tipo_pessoa;
            _cpf_cnpj = cpf_cnpj;
            _nome_razaoSocial = nome_razaoSocial;
            _data_proposta = data_proposta;
            _prazo_final = prazo_final;
            _data_inicio = data_inicio;
            _total = total;
            _situacao = situacao;
            _data_ult_alt = data_ult_alt;
            _servicos = servicos;
            _data_cadastro = data_cadastro;
        }
    }
}
