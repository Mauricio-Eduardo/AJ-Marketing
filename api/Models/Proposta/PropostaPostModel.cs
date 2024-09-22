using api.Models.PropostaServico;

namespace api.Models.Proposta
{
    public class PropostaPostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _tipo_pessoa;
        private int _peridiocidade_id;
        private int _cliente_id;
        private DateTime _data_proposta;
        private DateTime _prazo_final;
        private DateTime _data_inicio;
        private decimal _total;

        private List<PropostaServicoPostModel> _servicos;

        // Propriedades públicas para acessar as variáveis
        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public int Peridiocidade_id
        {
            get { return _peridiocidade_id; }
            set { _peridiocidade_id = value; }
        }

        public DateTime Data_proposta
        {
            get { return _data_proposta; }
            set { _data_proposta = value; }
        }

        public DateTime Prazo_final
        {
            get { return _prazo_final; }
            set { _prazo_final = value; }
        }

        public DateTime Data_inicio
        {
            get { return _data_inicio; }
            set { _data_inicio = value; }
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
        public PropostaPostModel(int cliente_id, int peridiocidade_id, DateTime data_proposta, 
            DateTime prazo_final, DateTime data_inicio, decimal total,
            List<PropostaServicoPostModel> servicos)
        {
            _cliente_id = cliente_id;
            _peridiocidade_id = peridiocidade_id;
            _data_proposta = data_proposta;
            _prazo_final = prazo_final;
            _data_inicio = data_inicio;
            _total = total;
            _servicos = servicos;
        }
    }
}
