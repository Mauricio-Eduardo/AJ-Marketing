namespace api.Models.País
{
    public class PaisPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _pais;
        private string _sigla;
        private string _ddi;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
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
        public PaisPostModel() { }

        // Construtor com parâmetros
        public PaisPostModel(string pais, string sigla, string ddi, bool ativo)
        {
            _pais = pais;
            _sigla = sigla;
            _ddi = ddi;
            _ativo = ativo;
        }
    }
}
