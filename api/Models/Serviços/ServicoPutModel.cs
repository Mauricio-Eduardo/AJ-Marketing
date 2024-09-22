namespace api.Models.Serviços
{
    public class ServicoPutModel
    {
        // Variáveis privadas correspondentes aos campos no banco de dados
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private string _servico;
        private decimal _valor;
        private string _descricao;

        private bool _ativo;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
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
        public ServicoPutModel(int id, string servico, decimal valor, string descricao, bool ativo)
        {
            _id = id;
            _servico = servico;
            _valor = valor;
            _descricao = descricao;
            _ativo = ativo;
        }
    }
}
