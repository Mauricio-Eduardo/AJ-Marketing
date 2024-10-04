
namespace api.Models.OrdemServico
{
    public class OrdemServicoPutModel
    {
        // Variáveis que podem ser editáveis em um registro
        private int _id; // o ID não é editável porém é necessário para a requisição do PUT
        private Nullable<int> _usuario_id;

        private DateTime _data_prazo;
        private Nullable<DateTime> _data_entrega;

        private string _tema;

        private string _situacao;
        private string _postado;
        private string _referencia;

        // Propriedades públicas para acessar as variáveis
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public Nullable<int> Usuario_id
        {
            get { return _usuario_id; }
            set { _usuario_id = value; }
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

        // Construtor sem parâmetros
        public OrdemServicoPutModel() { }

        // Construtor com parâmetros
        public OrdemServicoPutModel(int id, int usuario_id, DateTime data_prazo, DateTime data_entrega, string tema, string referencia, 
            string situacao, string postado)
        {
            _id = id;
            _usuario_id = usuario_id;
            _data_prazo = data_prazo;
            _data_entrega = data_entrega;
            _tema = tema;
            _referencia = referencia;
            _situacao = situacao;
            _postado = postado;
        }
    }
}
