
using api.Models.Usuario;

namespace api.Models.Cliente
{
    public class ClienteModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _cliente_ID;
        private string _tipo_pessoa;
        private string _cpf_cnpj;
        private string _nome_razaoSocial;
        private string _apelido_nomeFantasia;
        private string _rg_inscricaoEstadual;
        private DateTime _dataNascimento_dataAbertura;
        private string _genero;
        private string _email;
        private string _celular;
        private string _ramo_atividade;
        private int _cidade_ID;
        private string _cidade; // Variável usada somente para exibição
        private string _estado; // Variável usada somente para exibição 
        private string _pais; // Variável usada somente para exibição 
        private string _logradouro;
        private string _numero;
        private string _bairro;
        private string _complemento;
        private string _cep;
        private int _origem_ID;
        private string _origem; // Variável usada somente para exibição 
        private string _interesses;

        private List<UsuarioModel> _usuarios;

        private bool _ativo;
        private DateTime _dataCadastro;
        private DateTime _dataUltAlt;

        // Propriedades públicas para acessar as variáveis
        public int Cliente_ID
        {
            get { return _cliente_ID; }
            set { _cliente_ID = value; }
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

        public string Apelido_nomeFantasia
        {
            get { return _apelido_nomeFantasia; }
            set { _apelido_nomeFantasia = value; }
        }

        public string Rg_inscricaoEstadual
        {
            get { return _rg_inscricaoEstadual; }
            set { _rg_inscricaoEstadual = value; }
        }

        public DateTime DataNascimento_dataAbertura
        {
            get { return _dataNascimento_dataAbertura; }
            set { _dataNascimento_dataAbertura = value; }
        }

        public string Genero
        {
            get { return _genero; }
            set { _genero = value;  }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        public string Celular
        {
            get { return _celular; }
            set { _celular = value; }
        }

        public string Ramo_atividade
        {
            get { return _ramo_atividade; }
            set { _ramo_atividade = value; }
        }

        public int Cidade_ID
        {
            get { return _cidade_ID; }
            set { _cidade_ID = value; }
        }

        public string Cidade
        {
            get { return _cidade; }
            set { _cidade = value; }
        }

        public string Estado
        {
            get { return _estado; }
            set { _estado = value; }
        }

        public string Pais
        {
            get { return _pais; }
            set { _pais = value; }
        }

        public string Logradouro
        {
            get { return _logradouro; }
            set { _logradouro = value; }
        }

        public string Numero
        {
            get { return _numero; }
            set { _numero = value; }
        }

        public string Bairro
        {
            get { return _bairro; }
            set { _bairro = value; }
        }

        public string Complemento
        {
            get { return _complemento; }
            set { _complemento = value; }
        }

        public string Cep
        {
            get { return _cep; }
            set { _cep = value; }
        }

        public int Origem_ID
        {
            get { return _origem_ID; }
            set { _origem_ID = value; }
        }

        public string Origem
        {
            get { return _origem; }
            set { _origem = value; }
        }

        public string Interesses
        {
            get { return _interesses; }
            set { _interesses = value; }
        }

        public List<UsuarioModel> Usuarios
        {
            get { return _usuarios; }
            set { _usuarios = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        public DateTime Data_cadastro
        {
            get { return _dataCadastro; }
            set { _dataCadastro = value; }
        }

        public DateTime Data_ult_alt
        {
            get { return _dataUltAlt; }
            set { _dataUltAlt = value; }
        }

        // Construtor sem parâmetros
        public ClienteModel() { }

        // Construtor com parâmetros
        public ClienteModel(
            int cliente_ID,
            string tipo_pessoa,
            string cpf_cnpj,
            string nome_razaoSocial,
            string apelido_nomeFantasia,
            string rg_inscricaoEstadual,
            DateTime dataNascimento_dataAbertura,
            string genero,
            string email,
            string celular,
            string ramo_atividade,
            int cidade_ID,
            string cidade,
            string estado,
            string pais,
            string logradouro,
            string numero,
            string bairro,
            string complemento,
            string cep,
            int origem_ID,
            string origem,
            string interesses,
            List<UsuarioModel> usuarios,
            bool ativo,
            DateTime data_cadastro,
            DateTime data_ult_alt)
        {
            _cliente_ID = cliente_ID;
            _tipo_pessoa = tipo_pessoa;
            _cpf_cnpj = cpf_cnpj;
            _nome_razaoSocial = nome_razaoSocial;
            _apelido_nomeFantasia = apelido_nomeFantasia;
            _rg_inscricaoEstadual = rg_inscricaoEstadual;
            _dataNascimento_dataAbertura = dataNascimento_dataAbertura;
            _genero = genero;
            _email = email;
            _celular = celular;
            _ramo_atividade = ramo_atividade;
            _cidade_ID = cidade_ID;
            _cidade = cidade;
            _estado = estado;
            _pais = pais;
            _logradouro = logradouro;
            _numero = numero;
            _bairro = bairro;
            _complemento = complemento;
            _cep = cep;
            _origem_ID = origem_ID;
            _origem = origem;
            _interesses = interesses;
            _usuarios = usuarios;

            _ativo = ativo;
            _dataCadastro = data_cadastro;
            _dataUltAlt = data_ult_alt;
        }
    }
}
