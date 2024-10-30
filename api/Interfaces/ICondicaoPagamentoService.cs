using api.Models.CondicaoPagamento;

namespace api.Interfaces
{
    public interface ICondicaoPagamentoService
    {
        IEnumerable<CondicaoPagamentoModel> GetAllCondicoesPagamento();
        CondicaoPagamentoModel GetCondicaoPagamento(int id);
        CondicaoPagamentoValoresModel GetValoresCondicao(int parcela_id);
        string PostCondicaoPagamento(CondicaoPagamentoPostModel condicaoPagInserida);
        string PutCondicaoPagamento(CondicaoPagamentoPutModel condicaoPagAlterada);
        string DeleteCondicaoPagamento(int id);
    }
}
