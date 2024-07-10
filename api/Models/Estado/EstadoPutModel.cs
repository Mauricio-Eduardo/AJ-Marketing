namespace api.Models.Estado
{
    public class EstadoPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _estado_ID; // o ID não é editável porém é necessário para a requisição do PUT
        private string _estado;
        private string _uf;

        private int _pais_ID;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Estado_ID
        {
            get { return _estado_ID; }
            set { _estado_ID = value; }
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

        public int Pais_ID
        {
            get { return _pais_ID; }
            set { _pais_ID = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public EstadoPutModel() { }

        // Construtor com parâmetros
        public EstadoPutModel(int estado_ID, string estado, string uf, int pais_ID, bool ativo)
        {
            _estado_ID = estado_ID;
            _estado = estado;
            _uf = uf;
            _pais_ID = pais_ID;
            _ativo = ativo;
        }
    }
}
