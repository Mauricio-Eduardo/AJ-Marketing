using api.Models.País;

namespace api.Interfaces
{
    public interface IPaisesService
    {
        IEnumerable<PaisModel> GetAllPaisesAtivos();
        IEnumerable<PaisModel> GetAllPaises();
        PaisModel GetPais(int id);
        string PostPais(PaisPostModel paisInserido);
        string PutPais(PaisPutModel paisAlterado);
        string DeletePais(int id);
    }
}
