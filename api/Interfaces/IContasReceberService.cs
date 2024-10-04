using api.Models.ContaReceber;

namespace api.Interfaces
{
    public interface IContasReceberService
    {
        IEnumerable<ContaReceberModel> GetAllContasReceber();
        ContaReceberModel GetContaReceber(int id);
        //string PostContaReceber(ContaReceberPostModel contaInserida);
        string PutContaReceber(ContaReceberPutModel contaAlterada);
    }
}
