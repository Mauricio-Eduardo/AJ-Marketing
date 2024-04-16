namespace api.Models
{
    public class Cidades
    {
        public int cidade_ID { get; set; }
        public int estado_ID { get; set; }
        public string cidade { get; set; }
        public string? ddd { get; set; }


        public Cidades() { }

        public Cidades(int Cidade_ID, int Estado_ID, string Cidade, string Ddd)
        {
            cidade_ID = Cidade_ID;
            estado_ID = Estado_ID;
            cidade = Cidade;
            ddd = Ddd;
        }
    }
}
