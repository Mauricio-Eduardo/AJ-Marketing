namespace api.Models.Usuario
{
    public class UsuarioGetFromClienteModel
    {

        private int _usuario_ID; 
        private string _cpf;
        private string _nome;  

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

        // Construtor sem parâmetros
        public UsuarioGetFromClienteModel() { }

        // Construtor com parâmetros
        public UsuarioGetFromClienteModel(int Usuario_ID, string Cpf, string Nome)
        {
            _usuario_ID = Usuario_ID;
            _cpf = Cpf;
            _nome = Nome;
        }
    }
}
