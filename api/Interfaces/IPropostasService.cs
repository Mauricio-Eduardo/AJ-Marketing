using api.Models.Proposta;
using api.Models.PropostaServico;

namespace api.Interfaces
{
    public interface IPropostasService
    {
        IEnumerable<PropostaModel> GetAllPropostas();
        PropostaModel GetProposta(int id);
        List<PropostaServicoModel> GetServicosFromProposta(int id);
        string PostProposta(PropostaPostModel propostaInserida);
        string PutProposta(PropostaPutModel propostaAlterada);
        string AtualizarSituacaoProposta(PropostaAtualizaModel propostaAtualizada);
    }
}
