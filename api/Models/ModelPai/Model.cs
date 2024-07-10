namespace api.Models.ModelPai
{
    public class Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private bool _ativo;
        private DateTime _dataCadastro;
        private DateTime _dataUltAlt;

        // Propriedades públicas para acessar as variáveis
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
        public Model() { }

        // Construtor com parâmetros
        public Model(bool ativo, DateTime data_cadastro, DateTime data_ult_alt)
        {
            _ativo = ativo;
            _dataCadastro = data_cadastro;
            _dataUltAlt = data_ult_alt;
        }
    }
}
