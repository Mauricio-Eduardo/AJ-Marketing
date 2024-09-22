namespace api.Models.País
{
    public class PaisPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _pais;
        private string _sigla;
        private string _ddi;

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

        // Construtor sem parâmetros
        public PaisPostModel() { }

        // Construtor com parâmetros
        public PaisPostModel(string pais, string sigla, string ddi, bool ativo)
        {
            _pais = pais;
            _sigla = sigla;
            _ddi = ddi;
        }
    }
}
