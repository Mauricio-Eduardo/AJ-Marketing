namespace api.Models.Origem
{
    public class OrigemPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _origem;
        private bool _ativo;

        // Propriedades públicas para acessar as variáveis privadas
        public string Origem
        {
            get { return _origem; }
            set { _origem = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public OrigemPostModel() { }

        // Construtor com parâmetros
        public OrigemPostModel(string origem, bool ativo)
        {
            _origem = origem;
            _ativo = ativo;
        }
    }
}
