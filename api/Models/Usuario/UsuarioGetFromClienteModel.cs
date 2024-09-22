namespace api.Models.Usuario
{
    public class UsuarioGetFromClienteModel
    {

        private int _id; 
        private string _nome;  

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

        // Construtor sem parâmetros
        public UsuarioGetFromClienteModel() { }

        // Construtor com parâmetros
        public UsuarioGetFromClienteModel(int id, string Nome)
        {
            _id = id;
            _nome = Nome;
        }
    }
}
