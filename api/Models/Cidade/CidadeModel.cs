using api.Models.ModelPai;

namespace api.Models.Cidade
{
    public class CidadeModel: Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _cidade_ID;
        private string _cidade;
        private string _ddd;

        private int _estado_ID;
        private string _estado; // Variável usada somente para exibição 
        private string _pais; // Variável usada somente para exibição 

        //private bool _ativo;
        //private DateTime _dataCadastro;
        //private DateTime _dataUltAlt;

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

        public string Estado
        {
            get { return _estado; }
            set { _estado = value; }
        }

        public string Pais
        {
            get { return _pais; }
            set { _pais = value; }
        }

        //public bool Ativo
        //{
        //    get { return _ativo; }
        //    set { _ativo = value; }
        //}

        //public DateTime Data_cadastro
        //{
        //    get { return _dataCadastro; }
        //    set { _dataCadastro = value; }
        //}

        //public DateTime Data_ult_alt
        //{
        //    get { return _dataUltAlt; }
        //    set { _dataUltAlt = value; }
        //}

        // Construtor sem parâmetros
        public CidadeModel() { }

        // Construtor com parâmetros
        public CidadeModel(int cidade_ID, string cidade, string ddd, int estado_ID, string estado, string pais)
        {
            _cidade_ID = cidade_ID;
            _cidade = cidade;
            _ddd = ddd;
            _estado_ID = estado_ID;
            _estado = estado;
            _pais = pais;

            //_ativo = ativo;
            //_dataCadastro = data_cadastro;
            //_dataUltAlt = data_ult_alt;
        }
    }
}
