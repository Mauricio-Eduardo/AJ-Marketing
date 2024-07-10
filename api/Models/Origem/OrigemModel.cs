namespace api.Models.Origem
{
    public class OrigemModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _origem_ID;
        private string _origem;

        private bool _ativo;
        private DateTime _dataCadastro;
        private DateTime _dataUltAlt;

        // Propriedades públicas para acessar as variáveis
        public int Origem_ID
        {
            get { return _origem_ID; }
            set { _origem_ID = value; }
        }

        public string Origem
        {
            get { return _origem; }
            set { _origem = value; }
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
        public OrigemModel() { }

        // Construtor com parâmetros
        public OrigemModel(int origemID, string origem, bool ativo, DateTime data_cadastro, DateTime data_ult_alt)
        {
            _origem_ID = origemID;
            _origem = origem;
            _ativo = ativo;
            _dataCadastro = data_cadastro;
            _dataUltAlt = data_ult_alt;
        }
    }
}
