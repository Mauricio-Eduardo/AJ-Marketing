namespace api.Models.Estados
{
    public class Estados
    {
        public int estado_ID { get; set; }
        public string estado { get; set; } 
        public string uf { get; set; }

        public int pais_ID { get; set; }
        public string pais { get; set; } // Esse campo vai buscar da tabela países para retornar o nome do país para ser exibido no Frontend

        public bool ativo { get; set; }
        public DateTime data_cadastro { get; set; }
        public DateTime data_ult_alt { get; set; }

        public Estados() { }

        public Estados(int Estado_ID, string Estado, string Uf, int Pais_ID, string Pais,
            bool Ativo, DateTime Data_Cadastro, DateTime Data_ult_alt)
        {
            estado_ID = Estado_ID;
            estado = Estado;
            uf = Uf;

            pais_ID = Pais_ID;
            pais = Pais;

            ativo = Ativo;
            data_cadastro = Data_Cadastro;
            data_ult_alt = Data_ult_alt;
        }
    }
}
