namespace api.Models.Estados
{
    public class EstadosPutModel
    {
        public int estado_ID { get; set; } // Vai ser enviado no JSON do body somente para procurar o registro mas não vai ter o valor alterado
        public string estado { get; set; }
        public string uf { get; set; }
        public int pais_ID { get; set; }

        public bool ativo { get; set; }

        public EstadosPutModel(string Estado, string Uf, int Pais_ID, bool Ativo)
        {
            estado = Estado;
            uf = Uf;

            pais_ID = Pais_ID;

            ativo = Ativo;
        }
    }
}
