using api.Models.PropostaServico;

namespace api.Models.Proposta
{
    public class PropostaPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT

        private int _condPag_id;
        private DateTime _prazo_final;
        private decimal _total;
        private string _situacao;

        private List<PropostaServicoPutModel> _servicos;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public int CondPag_id
        {
            get { return _condPag_id; }
            set { _condPag_id = value; }
        }

        public DateTime Prazo_final
        {
            get { return _prazo_final; }
            set { _prazo_final = value; }
        }

        public decimal Total
        {
            get { return _total; }
            set { _total = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        public List<PropostaServicoPutModel> Servicos
        {
            get { return _servicos; }
            set { _servicos = value; }
        }

        // Construtor sem parâmetros
        public PropostaPutModel() { }

        // Construtor com parâmetros
        public PropostaPutModel(int id, int condPag_id, DateTime prazo_final, DateTime data_aprovacao, DateTime data_inicio, decimal total, 
            string situacao, List<PropostaServicoPutModel> servicos)
        {
            _id = id;
            _condPag_id = condPag_id;
            _prazo_final = prazo_final;
            _total = total;
            _situacao = situacao;
            _servicos = servicos;
        }
    }
}
