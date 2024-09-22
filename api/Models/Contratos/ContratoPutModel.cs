using api.Models.PropostaServico;

namespace api.Models.Contratos
{
    public class ContratoPutModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id;
        private string _situacao;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        // Construtor sem parâmetros
        public ContratoPutModel() { }

        // Construtor com parâmetros
        public ContratoPutModel(int id, string situacao) 
        {
            _id = id;
            _situacao= situacao;
        }
    }
}