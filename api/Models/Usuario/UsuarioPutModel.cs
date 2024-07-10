namespace api.Models.Usuario
{
    public class UsuarioPutModel
    {

        // Variáveis que podem ser editáveis em um registro
        private int _usuario_ID; // o ID não é editável porém é necessário para a requisição do PUT
        private string _cpf;
        private string _nome;  
        private string _email;
        private string _senha;

        private bool _ativo;

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

        // Construtor sem parâmetros
        public UsuarioPutModel() { }

        // Construtor com parâmetros
        public UsuarioPutModel(int Usuario_ID, string Cpf, string Nome, string Email, string Senha, bool Ativo)
        {
            _usuario_ID = Usuario_ID;
            _cpf = Cpf;
            _nome = Nome;
            _email = Email;
            _senha = Senha;
            _ativo = Ativo;
        }
    }
}
