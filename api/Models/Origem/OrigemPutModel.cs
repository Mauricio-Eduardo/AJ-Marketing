namespace api.Models.Origem
{
    public class OrigemPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _origem;
        private bool _ativo;

        // Propriedades públicas para acessar as variáveis privadas
        public int Id
        {
            get { return _id; }
            set { _id = value; }
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
        public OrigemPutModel(int id, string origem, bool ativo)
        {
            _id = id;
            _origem = origem;
            _ativo = ativo;
        }
    }
}
