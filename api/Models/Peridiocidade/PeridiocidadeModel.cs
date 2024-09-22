using api.Models.ModelPai;

namespace api.Models.Peridiocidade
{
    public class PeridiocidadeModel : Model
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private string _descricao;
        private int _dias;

        // Propriedades públicas para acessar as variáveis
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
        public PeridiocidadeModel() { }

        // Construtor com parâmetros
        public PeridiocidadeModel(string descricao, int dias)
        {
            _descricao = descricao;
            _dias = dias;
        }
    }
}
