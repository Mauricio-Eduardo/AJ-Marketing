using api.Models.FormaPagamento;

namespace api.Interfaces
{
    public interface IFormaPagamentoService
    {
        IEnumerable<FormaPagamentoModel> GetAllFormasPagamento();
        FormaPagamentoModel GetFormaPagamento(int id);
        string PostFormaPagamento(FormaPagamentoPostModel formaPagInserida);
        string PutFormaPagamento(FormaPagamentoPutModel formaPagAlterada);
        string DeleteFormaPagamento(int id);
    }
}
