using api.Models.ContaReceber;
using api.Models.Usuario;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IContasReceberService
    {
        IEnumerable<ContaReceberModel> GetAllContasReceber();
        ContaReceberModel GetContaReceber(int id);
        //string PostUsuario(ContaReceberPostModel contaInserido);
        string ReceberConta([FromBody] ContaReceberPutModel contaRecebida);
        string ReabrirConta(int id);
    }
}
