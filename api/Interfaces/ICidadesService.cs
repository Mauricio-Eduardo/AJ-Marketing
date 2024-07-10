using api.Models.Cidade;

namespace api.Interfaces
{
    public interface ICidadesService
    {
        IEnumerable<CidadeModel> GetAllCidadesAtivas();
        IEnumerable<CidadeModel> GetAllCidades();
        CidadeModel GetCidade(int cidade_ID);
        string PostCidade(CidadePostModel cidadeInserida);
        string PutCidade(CidadePutModel cidadeAlterada);
        string DeleteCidade(int cidade_ID);
    }
}
