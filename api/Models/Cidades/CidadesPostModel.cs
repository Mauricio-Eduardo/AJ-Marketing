namespace api.Models.Cidades
{
    public class CidadesPostModel
    {
        public string cidade { get; set; }
        public string ddd { get; set; }

        public int estado_ID { get; set; }

        public bool ativo { get; set; }

        public CidadesPostModel(string Cidade, string Ddd, int Estado_ID, bool Ativo)
        {
            cidade = Cidade;
            ddd = Ddd;
            estado_ID = Estado_ID;
            ativo = Ativo;
        }
    }
}
