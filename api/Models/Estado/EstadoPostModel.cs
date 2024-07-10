namespace api.Models.Estado
{
    public class EstadoPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _estado;
        private string _uf;

        private int _pais_ID;

        // Propriedades públicas para acessar as variáveis
        public string Estado
        {
            get { return _estado; }
            set { _estado = value; }
        }

        public string Uf
        {
            get { return _uf; }
            set { _uf = value; }
        }

        public int Pais_ID
        {
            get { return _pais_ID; }
            set { _pais_ID = value; }
        }

        // Construtor sem parâmetros
        public EstadoPostModel() { }

        // Construtor com parâmetros
        public EstadoPostModel(string estado, string uf, int pais_ID, bool ativo)
        {
            _estado = estado;
            _uf = uf;
            _pais_ID = pais_ID;
        }
    }
}
