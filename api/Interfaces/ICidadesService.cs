using api.Models.Cidade;

namespace api.Interfaces
{
    public interface ICidadesService
    {
        IEnumerable<CidadeModel> GetAllCidadesAtivas();
        IEnumerable<CidadeModel> GetAllCidades();
        CidadeModel GetCidade(int id);
        string PostCidade(CidadePostModel cidadeInserida);
        string PutCidade(CidadePutModel cidadeAlterada);
        string DeleteCidade(int id);
    }
}
