
using api.Models.ModelPai;

namespace api.Models.OrdemServico
{
    public class OrdemServicoModel: Model   
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private int _cliente_id;
        private string _nome_razaoSocial;
        private int _contrato_id;
        private Nullable<int> _usuario_id;
        private string? _nome;
        private int _servico_id;
        private string _servico;

        private DateTime _data_prazo;
        private Nullable<DateTime> _data_entrega;

        private string _tema;

        private string _situacao;
        private string _postado;
        private string _referencia;

        private DateTime _data_cadastro;
        private Nullable<DateTime> _data_ult_alt;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public int Cliente_id
        {
            get { return _cliente_id; }
            set { _cliente_id = value; }
        }

        public string Nome_razaoSocial
        {
            get { return _nome_razaoSocial; }
            set { _nome_razaoSocial = value; }
        }

        public Nullable<int> Usuario_id
        {
            get { return _usuario_id; }
            set { _usuario_id = value; }
        }
        
        public string? Nome
        {
            get { return _nome; }
            set { _nome = value; }
        }

        public int Contrato_id
        {
            get { return _contrato_id; }
            set { _contrato_id = value; }
        }

        public int Servico_id
        {
            get { return _servico_id; }
            set { _servico_id = value; }
        }

        public string Servico
        {
            get { return _servico; }
            set { _servico = value; }
        }

        public DateTime Data_prazo
        {
            get { return _data_prazo; }
            set { _data_prazo = value; }
        }

        public Nullable<DateTime> Data_entrega
        {
            get { return _data_entrega; }
            set { _data_entrega = value; }
        }

        public string Tema
        {
            get { return _tema; }
            set { _tema = value; }
        }

        public string Referencia
        {
            get { return _referencia; }
            set { _referencia = value; }
        }

        public string Situacao
        {
            get { return _situacao; }
            set { _situacao = value; }
        }

        public string Postado
        {
            get { return _postado; }
            set { _postado = value; }
        }

        public DateTime Data_cadastro
        {
            get { return _data_cadastro; }
            set { _data_cadastro = value; }
        }

        public DateTime? Data_ult_alt
        {
            get { return _data_ult_alt; }
            set { _data_ult_alt = value; }
        }

        // Construtor sem parâmetros
        public OrdemServicoModel() { }

        // Construtor com parâmetros
        public OrdemServicoModel(int id, int cliente_id, string nome_razaoSocial, int contrato_id, int usuario_id, string nome, int servico_id,
            string servico, DateTime data_prazo, DateTime data_entrega, string tema, string referencia, string situacao, string postado,
            DateTime data_cadastro, Nullable<DateTime> data_ult_alt)
        {
            _id = id;
            _cliente_id = cliente_id;
            _nome_razaoSocial = nome_razaoSocial;
            _contrato_id = contrato_id;
            _usuario_id = usuario_id;
            _nome = nome;
            _servico_id = servico_id;
            _servico = servico;
            _data_prazo = data_prazo;
            _data_entrega = data_entrega;
            _tema = tema;
            _referencia = referencia;
            _situacao = situacao;
            _postado = postado;
            _data_cadastro = data_cadastro;
            _data_ult_alt = data_ult_alt;
        }
    }
}
