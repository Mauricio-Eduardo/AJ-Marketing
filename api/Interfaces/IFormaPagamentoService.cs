using api.Models.FormaPagamento;

namespace api.Interfaces
{
    public interface IFormaPagamentoService
    {
        IEnumerable<FormaPagamentoModel> GetAllFormasPagamento(int ativo);
        FormaPagamentoModel GetFormaPagamento(int formaPag_ID);
        string PostFormaPagamento(FormaPagamentoPostModel formaPagInserida);
        string PutFormaPagamento(FormaPagamentoPutModel formaPagAlterada);
        string DeleteFormaPagamento(int formaPag_ID);
    }
}
