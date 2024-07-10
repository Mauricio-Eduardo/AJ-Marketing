namespace api.Models.País
{
    public class PaisModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _pais_ID;
        private string _pais;
        private string _sigla;
        private string _ddi;

        private bool _ativo;
        private DateTime _dataCadastro;
        private DateTime _dataUltAlt;

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

        public DateTime Data_cadastro
        {
            get { return _dataCadastro; }
            set { _dataCadastro = value; }
        }

        public DateTime Data_ult_alt
        {
            get { return _dataUltAlt; }
            set { _dataUltAlt = value; }
        }

        // Construtor sem parâmetros
        public PaisModel() { }

        // Construtor com parâmetros
        public PaisModel(int pais_ID, string pais, string sigla, string ddi, bool ativo, DateTime data_cadastro, DateTime data_ult_alt)
        {
            _pais_ID = pais_ID;
            _pais = pais;
            _sigla = sigla;
            _ddi = ddi;
            _ativo = ativo;
            _dataCadastro = data_cadastro;
            _dataUltAlt = data_ult_alt;
        }
    }
}
