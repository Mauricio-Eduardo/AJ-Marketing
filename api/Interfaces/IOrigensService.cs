using api.Models.Origem;

namespace api.Interfaces
{
    public interface IOrigensService
    {
        IEnumerable<OrigemModel> GetAllOrigensAtivas();
        IEnumerable<OrigemModel> GetAllOrigens();
        OrigemModel GetOrigem(int id);
        string PostOrigem(OrigemPostModel origemInserido);
        string PutOrigem(OrigemPutModel origemAlterado);
        string DeleteOrigem(int id);
    }
}
