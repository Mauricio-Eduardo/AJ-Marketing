
namespace api.Models.Peridiocidade
{
    public class PeridiocidadePostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _descricao;
        private int _dias;

        // Propriedades públicas para acessar as variáveis privadas
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

        // Construtor sem parâmetros
        public PeridiocidadePostModel() { }

        // Construtor com parâmetros
        public PeridiocidadePostModel(string descricao, int dias)
        {
            _descricao = descricao;
            _dias = dias;
        }
    }
}
