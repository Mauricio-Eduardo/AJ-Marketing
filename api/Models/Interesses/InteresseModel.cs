using api.Models.ModelPai;

namespace api.Models.Interesse
{
    public class InteresseModel : Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _interesse;

        // Propriedades públicas para acessar as variáveis
        public string Interesse
        {
            get { return _interesse; }
            set { _interesse = value; }
        }

        // Construtor sem parâmetros
        public InteresseModel() { }

        // Construtor com parâmetros
        public InteresseModel(string interesse)
        {
            _interesse = interesse;
        }
    }
}
