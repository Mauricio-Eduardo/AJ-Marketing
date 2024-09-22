using api.Models.ModelPai;

namespace api.Models.Cidade
{
    public class CidadeModel: Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _cidade;
        private string _ddd;

        private int _estado_id;
        private string _estado; // Variável usada somente para exibição 
        private string _pais; // Variável usada somente para exibição 

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

        // Construtor sem parâmetros
        public CidadeModel() { }

        // Construtor com parâmetros
        public CidadeModel(string cidade, string ddd, int estado_id, string estado, string pais)
        {
            _cidade = cidade;
            _ddd = ddd;
            _estado_id = estado_id;
            _estado = estado;
            _pais = pais;
        }
    }
}
