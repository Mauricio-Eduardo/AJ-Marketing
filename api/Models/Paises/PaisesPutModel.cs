namespace api.Models.Paises
{
    public class PaisesPutModel
    {
        public int pais_ID { get; set; } // Vai ser enviado no JSON do body somente para procurar o registro mas não vai ter o valor alterado
        public string pais { get; set; }
        public string ddi { get; set; }

        public bool ativo { get; set; }

        public PaisesPutModel(int Pais_ID, string Pais, string Ddi, bool Ativo)
        {
            pais_ID = Pais_ID;
            pais = Pais;
            ddi = Ddi;
            ativo = Ativo;
    }
    }
}
