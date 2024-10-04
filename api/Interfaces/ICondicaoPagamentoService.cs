using api.Models.CondicaoPagamento;
using api.Models.Parcelas;
using System.Data.SqlClient;

namespace api.Interfaces
{
    public interface ICondicaoPagamentoService
    {
        IEnumerable<CondicaoPagamentoModel> GetAllCondicoesPagamentoAtivas();
        IEnumerable<CondicaoPagamentoModel> GetAllCondicoesPagamento();
        CondicaoPagamentoModel GetCondicaoPagamento(int id);
        string PostCondicaoPagamento(CondicaoPagamentoPostModel condicaoPagInserida);
        string PutCondicaoPagamento(CondicaoPagamentoPutModel condicaoPagAlterada);
        string DeleteCondicaoPagamento(int id);
    }
}
