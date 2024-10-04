using api.Models.PropostaServico;

namespace api.Models.Proposta
{
    public class PropostaPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private Nullable<int> _cliente_id;
        private string _tipo_pessoa;
        private string _cpf_cnpj;
        private string _nome_razaoSocial;
        private int _peridiocidade_id;
        private DateTime _data_proposta;
        private DateTime _prazo_final;
        private DateTime _data_inicio;
        private decimal _total;

        private List<PropostaServicoPostModel> _servicos;

        // Propriedades públicas para acessar as variáveis
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

        public int Peridiocidade_id
        {
            get { return _peridiocidade_id; }
            set { _peridiocidade_id = value; }
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

        public List<PropostaServicoPostModel> Servicos
        {
            get { return _servicos; }
            set { _servicos = value; }
        }

        // Construtor sem parâmetros
        public PropostaPostModel() { }

        // Construtor com parâmetros
        public PropostaPostModel(int cliente_id, string tipo_pessoa, string cpf_cnpj, string nome_razaoSocial, 
            int peridiocidade_id, DateTime data_proposta, DateTime prazo_final, DateTime data_inicio, decimal total,
            List<PropostaServicoPostModel> servicos)
        {
            _cliente_id = cliente_id;
            _tipo_pessoa = tipo_pessoa;
            _cpf_cnpj = cpf_cnpj;
            _nome_razaoSocial = nome_razaoSocial;
            _peridiocidade_id = peridiocidade_id;
            _data_proposta = data_proposta;
            _prazo_final = prazo_final;
            _data_inicio = data_inicio;
            _total = total;
            _servicos = servicos;
        }
    }
}
