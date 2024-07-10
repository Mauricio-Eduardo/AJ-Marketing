namespace api.Models.Cidade
{
    public class CidadePostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _cidade;
        private string _ddd;

        private int _estado_ID;

        // Propriedades públicas para acessar as variáveis
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

        // Construtor sem parâmetros
        public CidadePostModel() { }

        // Construtor com parâmetros
        public CidadePostModel(string cidade, string ddd, int estado_ID)
        {
            _cidade = cidade;
            _ddd = ddd;
            _estado_ID = estado_ID;
        }
    }
}
