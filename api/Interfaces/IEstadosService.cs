using api.Models.Estado;

namespace api.Interfaces
{
    public interface IEstadosService
    {
        IEnumerable<EstadoModel> GetAllEstadosAtivos();
        IEnumerable<EstadoModel> GetAllEstados();
        EstadoModel GetEstado(int estado_ID);
        string PostEstado(EstadoPostModel estadoInserido);
        string PutEstado(EstadoPutModel estadoAlterado);
        string DeleteEstado(int estado_ID);
    }
}
