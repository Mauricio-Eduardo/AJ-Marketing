using api.Models.PropostaServico;

namespace api.Models.Contratos
{
    public class ContratosClienteModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _contrato_id;
        private DateTime _data_contrato;
        private DateTime _data_vencimento;
        private string _situacao;

        // Propriedades públicas para acessar as variáveis

        public int Contrato_id
        {
            get { return _contrato_id; }
            set { _contrato_id = value; }
        }

        public DateTime Data_contrato
        {
            get { return _data_contrato; }
            set { _data_contrato = value; }
        }

        public DateTime Data_vencimento
        {
            get { return _data_vencimento; }
            set { _data_vencimento = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        // Construtor sem parâmetros
        public ContratosClienteModel() { }

        // Construtor com parâmetros
        public ContratosClienteModel(int contrato_id, DateTime data_contrato, DateTime data_vencimento, string situacao) 
        {
            _contrato_id = contrato_id;
            _data_contrato= data_contrato;
            _data_vencimento = data_vencimento;
            _situacao= situacao;
        }
    }
}