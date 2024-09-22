using api.Models.Estado;

namespace api.Interfaces
{
    public interface IEstadosService
    {
        IEnumerable<EstadoModel> GetAllEstadosAtivos();
        IEnumerable<EstadoModel> GetAllEstados();
        EstadoModel GetEstado(int id);
        string PostEstado(EstadoPostModel estadoInserido);
        string PutEstado(EstadoPutModel estadoAlterado);
        string DeleteEstado(int id);
    }
}
