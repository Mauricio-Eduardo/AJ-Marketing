namespace api.Models.Usuario
{
    public class UsuarioPostModel
    {

        // Variáveis que são necessárias para criar um novo registro
        private string _cpf;
        private string _nome;  
        private string _email;
        private string _senha;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
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
        public UsuarioPostModel() { }

        // Construtor com parâmetros
        public UsuarioPostModel(string Cpf, string Nome, string Email, string Senha, bool Ativo)
        {
            _cpf = Cpf;
            _nome = Nome;
            _email = Email;
            _senha = Senha;
            _ativo = Ativo;
        }
    }
}
