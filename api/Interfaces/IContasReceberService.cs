using api.Models.ContaReceber;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IContasReceberService
    {
        IEnumerable<ContaReceberModel> GetAllContasReceber();
        ContaReceberModel GetContaReceber(int id);
        string ReceberConta([FromBody] ContaReceberPutModel contaRecebida);
        string ReabrirConta(int id);
    }
}
