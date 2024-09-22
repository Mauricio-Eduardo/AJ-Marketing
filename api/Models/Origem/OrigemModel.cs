using api.Models.ModelPai;

namespace api.Models.Origem
{
    public class OrigemModel : Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _origem;

        // Propriedades públicas para acessar as variáveis
        public string Origem
        {
            get { return _origem; }
            set { _origem = value; }
        }

        // Construtor sem parâmetros
        public OrigemModel() { }

        // Construtor com parâmetros
        public OrigemModel(string origem)
        {
            _origem = origem;
        }
    }
}
