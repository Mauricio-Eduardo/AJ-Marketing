using api.Models.ModelPai;

namespace api.Models.País
{
    public class PaisModel: Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
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
        public PaisModel() { }

        // Construtor com parâmetros
        public PaisModel(string pais, string sigla, string ddi)
        {
            _pais = pais;
            _sigla = sigla;
            _ddi = ddi;
        }
    }
}
