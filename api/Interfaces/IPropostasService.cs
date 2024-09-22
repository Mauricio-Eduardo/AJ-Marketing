using api.Models.Proposta;

namespace api.Interfaces
{
    public interface IPropostasService
    {
        IEnumerable<PropostaModel> GetAllPropostas();
        PropostaModel GetProposta(int id);
        string PostProposta(PropostaPostModel propostaInserida);
        string PutProposta(PropostaPutModel propostaAlterada);
        string AtualizarSituacaoProposta(int id, string situacao);
    }
}
