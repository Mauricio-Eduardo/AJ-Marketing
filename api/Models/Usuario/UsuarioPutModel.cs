namespace api.Models.Usuario
{
    public class UsuarioPutModel
    {

        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _nome;  
        private string _email;
        private string _senha;

        private int? _novoUsuario_id;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
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

        public int? NovoUsuario_id
        {
            get { return _novoUsuario_id; }
            set { _novoUsuario_id = value; }
        }

        //public string SenhaAtual
        //{
        //    get { return _senhaAtual; }
        //    set { _senhaAtual = value; }
        //}

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public UsuarioPutModel() { }

        // Construtor com parâmetros
        public UsuarioPutModel(int id, string nome, string email, string senha, int novoUsuario_id, bool ativo)
        {
            _id = id;
            _nome = nome;
            _email = email;
            _senha = senha;
            _novoUsuario_id = novoUsuario_id;
            _ativo = ativo;
        }
    }
}
