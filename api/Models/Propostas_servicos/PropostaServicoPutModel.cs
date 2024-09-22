namespace api.Models.PropostaServico
{
    public class PropostaServicoPutModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        //private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private int _servico_id;

        private int _quantidade;
        private decimal _valor_unitario;
        private decimal _desconto;
        private decimal _valor_total;

        // Propriedades públicas para acessar as variáveis
        //public int Id
        //{
        //    get { return _id; }
        //    set { _id = value; }
        //}

        public int Servico_id
        {
            get { return _servico_id; }
            set { _servico_id = value; }
        }

        public int Quantidade
        {
            get { return _quantidade; }
            set { _quantidade = value; }
        }

        public decimal Valor_unitario
        {
            get { return _valor_unitario; }
            set { _valor_unitario = value; }
        }

        public decimal Desconto
        {
            get { return _desconto; }
            set { _desconto = value; }
        }

        public decimal Valor_total
        {
            get { return _valor_total; }
            set { _valor_total = value; }
        }

        // Construtor sem parâmetros
        public PropostaServicoPutModel() { }

        // Construtor com parâmetros
        public PropostaServicoPutModel(int id, int servico_id, int quantidade, decimal valor_unitario, decimal desconto, 
            decimal valor_total)
        {
            //_id = id;
            _servico_id = servico_id;
            _quantidade = quantidade;
            _valor_unitario = valor_unitario;
            _valor_total = valor_total;
            _desconto = desconto;
        }
    }
}
