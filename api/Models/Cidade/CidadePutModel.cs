namespace api.Models.Cidade
{
    public class CidadePutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _cidade;
        private string _ddd;

        private int _estado_id;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Cidade
        {
            get { return _cidade; }
            set { _cidade = value; }
        }

        public string Ddd
        {
            get { return _ddd; }
            set { _ddd = value; }
        }
        public int Estado_id
        {
            get { return _estado_id; }
            set { _estado_id = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public CidadePutModel() { }

        // Construtor com parâmetros
        public CidadePutModel(int id, string cidade, string ddd, int estado_id, bool ativo)
        {
            _id = id;
            _cidade = cidade;
            _ddd = ddd;
            _estado_id = estado_id;
            _ativo = ativo;
        }
    }
}
