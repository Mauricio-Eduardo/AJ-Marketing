using api.Models.ModelPai;

namespace api.Models.RamosAtividade
{
    public class RamoAtividadeModel : Model
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
        public RamoAtividadeModel() { }

        // Construtor com parâmetros
        public RamoAtividadeModel(string ramo)
        {
            _ramo = ramo;
        }
    }
}
