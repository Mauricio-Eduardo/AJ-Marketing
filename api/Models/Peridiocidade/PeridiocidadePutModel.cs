namespace api.Models.Peridiocidade
{
    public class PeridiocidadePutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _descricao;
        private int _dias;
        private bool _ativo;

        // Propriedades públicas para acessar as variáveis privadas
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Descricao
        {
            get { return _descricao; }
            set { _descricao = value; }
        }

        public int Dias
        {
            get { return _dias; }
            set { _dias = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public PeridiocidadePutModel() { }

        // Construtor com parâmetros
        public PeridiocidadePutModel(int id, string descricao, int dias, bool ativo)
        {
            _id = id;
            _descricao = descricao;
            _dias = dias;
            _ativo = ativo;
        }
    }
}
