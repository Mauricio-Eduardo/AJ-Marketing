namespace api.Models.Paises
{
    public class PaisesPostModel
    {

        public string pais { get; set; }
        public string ddi { get; set; }

        public bool ativo { get; set; }

        public PaisesPostModel(string Pais, string Ddi, bool Ativo)
        {
            pais = Pais;
            ddi = Ddi;
            ativo = Ativo;
        }
    }
}
