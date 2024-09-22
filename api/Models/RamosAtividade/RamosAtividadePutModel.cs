namespace api.Models.RamosAtividade
{
    public class RamoAtividadePutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _ramo;
        private bool _ativo;

        // Propriedades públicas para acessar as variáveis privadas
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Ramo
        {
            get { return _ramo; }
            set { _ramo = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public RamoAtividadePutModel() { }

        // Construtor com parâmetros
        public RamoAtividadePutModel(int id, string ramo, bool ativo)
        {
            _id = id;
            _ramo = ramo;
            _ativo = ativo;
        }
    }
}
