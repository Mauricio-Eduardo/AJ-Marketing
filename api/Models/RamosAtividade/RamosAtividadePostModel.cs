namespace api.Models.RamosAtividade
{
    public class RamoAtividadePostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _ramo;

        // Propriedades públicas para acessar as variáveis
        public string Ramo
        {
            get { return _ramo; }
            set { _ramo = value; }
        }

        // Construtor sem parâmetros
        public RamoAtividadePostModel() { }

        // Construtor com parâmetros
        public RamoAtividadePostModel(string ramo)
        {
            _ramo = ramo;
        }
    }
}
