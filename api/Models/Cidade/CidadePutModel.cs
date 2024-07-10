namespace api.Models.Cidade
{
    public class CidadePutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _cidade_ID; // o ID não é editável porém é necessário para a requisição do PUT
        private string _cidade;
        private string _ddd;

        private int _estado_ID;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Cidade_ID
        {
            get { return _cidade_ID; }
            set { _cidade_ID = value; }
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
        public int Estado_ID
        {
            get { return _estado_ID; }
            set { _estado_ID = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public CidadePutModel() { }

        // Construtor com parâmetros
        public CidadePutModel(int cidade_ID, string cidade, string ddd, int estado_ID, bool ativo)
        {
            _cidade_ID = cidade_ID;
            _cidade = cidade;
            _ddd = ddd;
            _estado_ID = estado_ID;
            _ativo = ativo;
        }
    }
}
