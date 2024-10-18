using api.Models.PropostaServico;

namespace api.Models.Proposta
{
    public class PropostaAtualizaModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT

        private Nullable<DateTime> _data_aprovacao;
        private Nullable<DateTime> _data_inicio;

        private string _situacao;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public DateTime? Data_aprovacao
        {
            get { return _data_aprovacao; }
            set { _data_aprovacao = value; }
        }

        public DateTime? Data_inicio
        {
            get { return _data_inicio; }
            set { _data_inicio = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        // Construtor sem parâmetros
        public PropostaAtualizaModel() { }

        // Construtor com parâmetros
        public PropostaAtualizaModel(int id, DateTime data_aprovacao, DateTime data_inicio, string situacao)
        {
            _id = id;
            _data_aprovacao = data_aprovacao;
            _data_inicio = data_inicio;
            _situacao = situacao;
        }
    }
}
