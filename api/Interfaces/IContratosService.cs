using api.Models.Contratos;

namespace api.Interfaces
{
    public interface IContratosService
    {
        IEnumerable<ContratoModel> GetAllContratos();
        ContratoModel GetContrato(int id);
        string PostContrato(ContratoPostModel contratoInserido);
        string CancelarContrato(int id);
    }
}
