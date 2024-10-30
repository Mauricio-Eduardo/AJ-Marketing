using api.Models.OrdemServico;

namespace api.Interfaces
{
    public interface IOrdensServicoService
    {
        IEnumerable<OrdemServicoModel> GetAllOrdens(string situacao);
        IEnumerable<OrdemServicoModel> GetAllPostados();
        OrdemServicoModel GetOrdemServico(int id);
        string PutOrdemServico(OrdemServicoPutModel ordemAlterada);
        string IniciarPausar(int id, string situacao);
        string Entregar(int id);
        string Postar(int id);
    }
}
