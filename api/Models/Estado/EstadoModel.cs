using api.Models.ModelPai;

namespace api.Models.Estado
{
    public class EstadoModel: Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _estado_ID;
        private string _estado;
        private string _uf;

        private int _pais_ID;
        private string _pais; // Variável usada somente para exibição 

        // Propriedades públicas para acessar as variáveis
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

        public string Pais
        {
            get { return _pais; }
            set { _pais = value; }
        }

        // Construtor sem parâmetros
        public EstadoModel() { }

        // Construtor com parâmetros
        public EstadoModel(int estado_ID, string estado, string uf, int pais_ID, string pais)
        {
            _estado_ID = estado_ID;
            _estado = estado;
            _uf = uf;
            _pais_ID = pais_ID;
            _pais = pais;
        }
    }
}
