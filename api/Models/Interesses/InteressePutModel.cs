namespace api.Models.Interesse
{
    public class InteressePutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _interesse;
        private bool _ativo;

        // Propriedades públicas para acessar as variáveis privadas
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Interesse
        {
            get { return _interesse; }
            set { _interesse = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public InteressePutModel() { }

        // Construtor com parâmetros
        public InteressePutModel(int id, string interesse, bool ativo)
        {
            _id = id;
            _interesse = interesse;
            _ativo = ativo;
        }
    }
}
