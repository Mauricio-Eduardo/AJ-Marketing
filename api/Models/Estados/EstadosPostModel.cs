namespace api.Models.Estados
{
    public class EstadosPostModel
    {

        public string estado { get; set; }
        public string uf { get; set; }
        public int pais_ID { get; set; }

        public bool ativo { get; set; }

        public EstadosPostModel(string Estado, string Uf, int Pais_ID, bool Ativo)
        {
            estado = Estado;
            uf = Uf;

            pais_ID = Pais_ID;

            ativo = Ativo;
        }
    }
}
