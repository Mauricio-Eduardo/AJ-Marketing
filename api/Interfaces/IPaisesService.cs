using api.Models.País;

namespace api.Interfaces
{
    public interface IPaisesService
    {
        IEnumerable<PaisModel> GetAllPaises(int ativo);
        PaisModel GetPais(int pais_ID);
        string PostPais(PaisPostModel paisInserido);
        string PutPais(PaisPutModel paisAlterado);
        string DeletePais(int pais_ID);
    }
}
