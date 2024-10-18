using api.Models.PropostaServico;

namespace api.Models.Proposta
{
    public class PropostaPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private int _cliente_id;
        private int _condPag_id;
        private DateTime _prazo_final;
        private decimal _total;

        private List<PropostaServicoPostModel> _servicos;

        // Propriedades públicas para acessar as variáveis
        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
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

        public List<PropostaServicoPostModel> Servicos
        {
            get { return _servicos; }
            set { _servicos = value; }
        }

        // Construtor sem parâmetros
        public PropostaPostModel() { }

        // Construtor com parâmetros
        public PropostaPostModel(int cliente_id, int condPag_id, DateTime prazo_final, decimal total, 
            List<PropostaServicoPostModel> servicos)
        {
            _cliente_id = cliente_id;
            _condPag_id = condPag_id;
            _prazo_final = prazo_final;
            _total = total;
            _servicos = servicos;
        }
    }
}
