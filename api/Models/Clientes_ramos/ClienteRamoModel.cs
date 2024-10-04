
namespace api.Models.Clientes_ramos
{
    public class ClienteRamoModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _ramo_id;
        private string _ramo;

        // Propriedades públicas para acessar as variáveis
        public int Ramo_id
        {
            get { return _ramo_id; }
            set { _ramo_id = value; }
        }

        public string Ramo
        {
            get { return _ramo; }
            set { _ramo = value; }
        }


        // Construtor sem parâmetros
        public ClienteRamoModel() { }

        // Construtor com parâmetros
        public ClienteRamoModel(int ramo_id, string ramo)
        {
            _ramo_id = ramo_id;
            _ramo = ramo;
        }
    }
}
