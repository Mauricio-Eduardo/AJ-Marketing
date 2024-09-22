namespace api.Models.ModelPai
{
    public class Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        private bool _ativo;
        private DateTime _dataCadastro;
        private Nullable<DateTime> _dataUltAlt;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
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

        public DateTime ?Data_ult_alt
        {
            get { return _dataUltAlt; }
            set { _dataUltAlt = value; }
        }

        // Construtor sem parâmetros
        public Model() { }

        // Construtor com parâmetros
        public Model(int id, bool ativo, DateTime data_cadastro, Nullable<DateTime> data_ult_alt)
        {
            _id = id;
            _ativo = ativo;
            _dataCadastro = data_cadastro;
            _dataUltAlt = data_ult_alt;
        }
    }
}
