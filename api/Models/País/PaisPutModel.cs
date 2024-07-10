namespace api.Models.País
{
    public class PaisPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _pais_ID; // o ID não é editável porém é necessário para a requisição do PUT
        private string _pais;
        private string _sigla;
        private string _ddi;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Pais_ID
        {
            get { return _pais_ID; }
            set { _pais_ID = value; }
        }

        public string Pais
        {
            get { return _pais; }
            set { _pais = value; }
        }

        public string Sigla
        {
            get { return _sigla; }
            set { _sigla = value; }
        }

        public string Ddi
        {
            get { return _ddi; }
            set { _ddi = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public PaisPutModel() { }

        // Construtor com parâmetros
        public PaisPutModel(int pais_ID, string pais, string sigla, string ddi, bool ativo)
        {
            _pais_ID = pais_ID;
            _pais = pais;
            _sigla = sigla;
            _ddi = ddi;
            _ativo = ativo;
        }
    }
}
