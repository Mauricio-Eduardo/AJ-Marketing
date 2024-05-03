namespace api.Models.Paises
{
    public class Paises
    {
        public int pais_ID { get; set; }
        public string pais { get; set; }
        public string ddi { get; set; }

        public bool ativo { get; set; }
        public DateTime data_cadastro { get; set; }
        public DateTime data_ult_alt { get; set; }


        public Paises() { }

        public Paises(int Pais_ID, string Pais, string Ddi, bool Ativo, DateTime Data_cadastro, DateTime Data_ult_alt)
        {
            pais_ID = Pais_ID;
            pais = Pais;
            ddi = Ddi;

            ativo = Ativo;
            data_cadastro = Data_cadastro;
            data_ult_alt = Data_ult_alt;
        }

    }
}
