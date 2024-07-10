namespace api.Models.Serviços
{
    public class ServicoPutModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _servico_ID; // o ID não é editável porém é necessário para a requisição do PUT
        private string _servico;
        private decimal _valor;
        private string _descricao;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Servico_ID
        {
            get { return _servico_ID; }
            set { _servico_ID = value; }
        }

        public string Servico
        {
            get { return _servico; }
            set { _servico = value; }
        }

        public decimal Valor
        {
            get { return _valor; }
            set { _valor = value; }
        }

        public string Descricao
        {
            get { return _descricao; }
            set { _descricao = value; }
        }

        public bool Ativo
        {
            get { return _ativo; }
            set { _ativo = value; }
        }

        // Construtor sem parâmetros
        public ServicoPutModel() { }

        // Construtor com parâmetros
        public ServicoPutModel(int servico_ID, string servico, decimal valor, string descricao, bool ativo)
        {
            _servico_ID = servico_ID;
            _servico = servico;
            _valor = valor;
            _descricao = descricao;
            _ativo = ativo;
        }
    }
}
