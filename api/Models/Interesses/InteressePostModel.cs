namespace api.Models.Interesse
{
    public class InteressePostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _interesse;

        // Propriedades públicas para acessar as variáveis privadas
        public string Interesse
        {
            get { return _interesse; }
            set { _interesse = value; }
        }

        // Construtor sem parâmetros
        public InteressePostModel() { }

        // Construtor com parâmetros
        public InteressePostModel(string interesse)
        {
            _interesse = interesse;
        }
    }
}
