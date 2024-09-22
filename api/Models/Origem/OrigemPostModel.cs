namespace api.Models.Origem
{
    public class OrigemPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _origem;

        // Propriedades públicas para acessar as variáveis privadas
        public string Origem
        {
            get { return _origem; }
            set { _origem = value; }
        }

        // Construtor sem parâmetros
        public OrigemPostModel() { }

        // Construtor com parâmetros
        public OrigemPostModel(string origem, bool ativo)
        {
            _origem = origem;
        }
    }
}
