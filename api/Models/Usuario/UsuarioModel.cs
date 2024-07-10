namespace api.Models.Usuario
{
    public class UsuarioModel
    {

        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _usuario_ID;
        private string _cpf;
        private string _nome;  
        private string _email;
        private string _senha;

        private bool _ativo;
        private DateTime _dataCadastro;
        private DateTime _dataUltAlt;

        // Propriedades públicas para acessar as variáveis
        public int Usuario_ID
        {
            get { return _usuario_ID; }
            set { _usuario_ID = value; }
        }

        public string Cpf
        {
            get { return _cpf; }
            set { _cpf = value; }
        }

        public string Nome
        {
            get { return _nome; }
            set { _nome = value; }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        public string Senha
        {
            get { return _senha; }
            set { _senha = value; }
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
        public UsuarioModel() { }

        // Construtor com parâmetros
        public UsuarioModel(int Usuario_ID, string Cpf, string Nome, string Email, string Senha, bool Ativo, DateTime Data_cadastro, DateTime Data_ult_alt)
        {
            _usuario_ID = Usuario_ID;
            _cpf = Cpf;
            _nome = Nome;
            _email = Email;
            _senha = Senha;
            _ativo = Ativo;
            _dataCadastro = Data_cadastro;
            _dataUltAlt = Data_ult_alt;
        }
    }
}
