using api.Models.Serviços;

namespace api.Interfaces
{
    public interface IServicosService
    {
        IEnumerable<ServicoModel> GetAllServicos();
        ServicoModel GetServico(int id);
        string PostServico(ServicoPostModel servicoInserido);
        string PutServico(ServicoPutModel servicoAlterado);
        string DeleteServico(int id);
    }
}
