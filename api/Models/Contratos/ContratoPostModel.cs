namespace api.Models.Contratos
{
    public class ContratoPostModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _cliente_id;
        private int _proposta_id;
        private DateTime _data_vencimento;

        // Propriedades públicas para acessar as variáveis
        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public int Proposta_id
        {
            get { return _proposta_id; }
            set { _proposta_id = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        // Construtor sem parâmetros
        public ContratoPostModel() { }

        // Construtor com parâmetros
        public ContratoPostModel(int cliente_id, int proposta_id, DateTime data_vencimento) 
        {
            _cliente_id = cliente_id;
            _proposta_id = proposta_id;
            _data_vencimento = data_vencimento;
        }
    }
}