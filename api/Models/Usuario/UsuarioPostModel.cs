namespace api.Models.Usuario
{
    public class UsuarioPostModel
    {

        // Variáveis que são necessárias para criar um novo registro
        private string _nome;  
        private string _email;
        private string _senha;

        // Propriedades públicas para acessar as variáveis
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

        // Construtor sem parâmetros
        public UsuarioPostModel() { }

        // Construtor com parâmetros
        public UsuarioPostModel(string nome, string email, string senha)
        {
            _nome = nome;
            _email = email;
            _senha = senha;
        }
    }
}
