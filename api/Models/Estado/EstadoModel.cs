using api.Models.ModelPai;

namespace api.Models.Estado
{
    public class EstadoModel: Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _estado;
        private string _uf;

        private int _pais_id;
        private string _pais; // Variável usada somente para exibição 

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

        public int Pais_id
        {
            get { return _pais_id; }
            set { _pais_id = value; }
        }

        public string Pais
        {
            get { return _pais; }
            set { _pais = value; }
        }

        // Construtor sem parâmetros
        public EstadoModel() { }

        // Construtor com parâmetros
        public EstadoModel(string estado, string uf, int pais_id, string pais)
        {
            _estado = estado;
            _uf = uf;
            _pais_id = pais_id;
            _pais = pais;
        }
    }
}
