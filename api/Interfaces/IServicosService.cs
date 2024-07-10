using api.Models.Serviços;

namespace api.Interfaces
{
    public interface IServicosService
    {
        IEnumerable<ServicoModel> GetAllServicos(int ativo);
        ServicoModel GetServico(int servico_ID);
        string PostServico(ServicoPostModel servicoInserido);
        string PutServico(ServicoPutModel servicoAlterado);
        string DeleteServico(int servico_ID);
    }
}
