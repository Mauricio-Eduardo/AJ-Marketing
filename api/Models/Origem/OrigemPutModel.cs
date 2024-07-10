namespace api.Models.Origem
{
    public class OrigemPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _origem_ID; // o ID não é editável porém é necessário para a requisição do PUT
        private string _origem;
        private bool _ativo;

        // Propriedades públicas para acessar as variáveis privadas
        public int Origem_ID
        {
            get { return _origem_ID; }
            set { _origem_ID = value; }
        }

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
        public OrigemPutModel() { }

        // Construtor com parâmetros
        public OrigemPutModel(int origem_ID, string origem, bool ativo)
        {
            _origem_ID = origem_ID;
            _origem = origem;
            _ativo = ativo;
        }
    }
}
