using api.Models.Interesse;

namespace api.Interfaces
{
    public interface IInteressesService
    {
        IEnumerable<InteresseModel> GetAllInteresses();
        InteresseModel GetInteresse(int id);
        string PostInteresse(InteressePostModel interesseInserido);
        string PutInteresse(InteressePutModel interesseAlterado);
        string DeleteInteresse(int id);
    }
}
