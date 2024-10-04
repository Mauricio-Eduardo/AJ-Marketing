using api.Models.OrdemServico;

namespace api.Interfaces
{
    public interface IOrdensServicoService
    {
        IEnumerable<OrdemServicoModel> GetAllOrdensServico();
        OrdemServicoModel GetOrdemServico(int id);
        //string PostContaReceber(ContaReceberPostModel contaInserida);
        string PutOrdemServico(OrdemServicoPutModel ordemAlterada);
    }
}
