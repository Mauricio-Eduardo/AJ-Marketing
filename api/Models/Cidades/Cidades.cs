
namespace api.Models.Cidades
{
    public class Cidades
    {
        public int cidade_ID { get; set; }
        public string cidade { get; set; }
        public string ddd { get; set; }

        public int estado_ID { get; set; }
        public string estado { get; set; } // Esse campo vai buscar da tabela estados para retornar o nome do estado para ser exibido no Frontend

        public bool ativo { get; set; }
        public DateTime data_cadastro { get; set; }
        public DateTime data_ult_alt { get; set; }



        public Cidades() { }

        public Cidades(int Cidade_ID, string Cidade, string Ddd, int Estado_ID, string Estado,
            bool Ativo, DateTime Data_Cadastro, DateTime Data_ult_alt)
        {
            cidade_ID = Cidade_ID;
            cidade = Cidade;
            ddd = Ddd;

            estado_ID = Estado_ID;
            estado = Estado;

            ativo = Ativo;
            data_cadastro = Data_Cadastro;
            data_ult_alt = Data_ult_alt;
        }
    }
}
