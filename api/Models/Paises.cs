namespace api.Models
{
    public class Paises
    {
        public int pais_ID{ get; set; }
        public string pais { get; set; }
        public string? ddi { get; set; }


        public Paises() { }

        public Paises(int Pais_ID, string Pais, string Ddi)
        {
            pais_ID = Pais_ID;
            pais = Pais;
            ddi = Ddi;
        }
    }
}
