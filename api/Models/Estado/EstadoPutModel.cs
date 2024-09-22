namespace api.Models.Estado
{
    public class EstadoPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _estado;
        private string _uf;

        private int _pais_id;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Estado
        {
            get { return _estado; }
            set { _estado = value; }
        }

        public string Uf
        {
            get { return _uf; }
            set { _uf = value; }
        }

        public int Pais_id
        {
            get { return _pais_id; }
            set { _pais_id = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public EstadoPutModel() { }

        // Construtor com parâmetros
        public EstadoPutModel(int id, string estado, string uf, int pais_id, bool ativo)
        {
            _id = id;
            _estado = estado;
            _uf = uf;
            _pais_id = pais_id;
            _ativo = ativo;
        }
    }
}
