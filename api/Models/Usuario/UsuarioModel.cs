using api.Models.ModelPai;

namespace api.Models.Usuario
{
    public class UsuarioModel: Model
    {

        // Variáveis privadas correspondentes aos campos no banco de dados
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
        public UsuarioModel() { }

        // Construtor com parâmetros
        public UsuarioModel(string nome, string email, string senha)
        {
            _nome = nome;
            _email = email;
            _senha = senha;
        }
    }
}
