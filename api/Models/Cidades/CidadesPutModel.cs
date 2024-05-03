namespace api.Models.Cidades
{
    public class CidadesPutModel
    {
        public int cidade_ID { get; set; } // Vai ser enviado no JSON do body somente para procurar o registro mas não vai ter o valor alterado
        public string cidade { get; set; }
        public string ddd { get; set; }
        public int estado_ID { get; set; }

        public bool ativo { get; set; }

        public CidadesPutModel(string Cidade, string Ddd, int Estado_ID, bool Ativo)
        {
            cidade = Cidade;
            ddd = Ddd;

            estado_ID = Estado_ID;

            ativo = Ativo;
        }
    }
}
