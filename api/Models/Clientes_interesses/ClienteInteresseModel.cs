
namespace api.Models.Clientes_interesses
{
    public class ClienteInteresseModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _interesse_id;
        private string _interesse;

        // Propriedades públicas para acessar as variáveis
        public int Interesse_id
        {
            get { return _interesse_id; }
            set { _interesse_id = value; }
        }

        public string Interesse
        {
            get { return _interesse; }
            set { _interesse = value; }
        }


        // Construtor sem parâmetros
        public ClienteInteresseModel() { }

        // Construtor com parâmetros
        public ClienteInteresseModel(int interesse_id, string interesse)
        {
            _interesse_id = interesse_id;
            _interesse = interesse;
        }
    }
}
