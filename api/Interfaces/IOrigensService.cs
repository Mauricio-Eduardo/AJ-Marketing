using api.Models.Origem;

namespace api.Interfaces
{
    public interface IOrigensService
    {
        IEnumerable<OrigemModel> GetAllOrigens(int ativo);
        OrigemModel GetOrigem(int origem_ID);
        string PostOrigem(OrigemPostModel origemInserido);
        string PutOrigem(OrigemPutModel origemAlterado);
        string DeleteOrigem(int origem_ID);
    }
}
