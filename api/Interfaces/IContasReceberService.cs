using api.Models.ContaReceber;
using api.Models.Recebimentos;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace api.Interfaces
{
    public interface IContasReceberService
    {
        IEnumerable<ContaReceberModel> GetAllContasReceber();
        ContaReceberModel GetContaReceber(int id);
        string ReceberConta([FromBody] RecebimentosPostModel recebimento);
    }
}
