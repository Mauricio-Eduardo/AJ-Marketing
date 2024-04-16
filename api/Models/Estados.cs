namespace api.Models
{
    public class Estados
    {
        public int estado_ID { get; set; }
        public int pais_ID { get; set; }
        public string estado { get; set; }
        public string uf { get; set; }


        public Estados() { }

        public Estados(int Estado_ID, int Pais_ID, string Estado, string Uf)
        {
            estado_ID = Estado_ID;
            pais_ID = Pais_ID;
            estado = Estado;
            uf = Uf;
        }
    }
}
