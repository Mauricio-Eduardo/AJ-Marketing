namespace api.Models.Cidade
{
    public class CidadePostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _cidade;
        private string _ddd;

        private int _estado_id;

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
        public int Estado_id
        {
            get { return _estado_id; }
            set { _estado_id = value; }
        }

        // Construtor sem parâmetros
        public CidadePostModel() { }

        // Construtor com parâmetros
        public CidadePostModel(string cidade, string ddd, int estado_id)
        {
            _cidade = cidade;
            _ddd = ddd;
            _estado_id = estado_id;
        }
    }
}
