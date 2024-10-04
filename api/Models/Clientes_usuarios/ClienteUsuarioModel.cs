
namespace api.Models.Clientes_usuarios
{
    public class ClienteUsuarioModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _usuario_id;
        private string _nome;
        private string _email; 

        // Propriedades públicas para acessar as variáveis
        public int Usuario_id
        {
            get { return _usuario_id; }
            set { _usuario_id = value; }
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

        // Construtor sem parâmetros
        public ClienteUsuarioModel() { }

        // Construtor com parâmetros
        public ClienteUsuarioModel(int usuario_id, string nome, string email)
        {
            _usuario_id = usuario_id;
            _nome = nome;
            _email = email;
        }
    }
}
