using api.Models.Cliente;

namespace api.Interfaces
{
    public interface IClientesService
    {
        IEnumerable<ClienteModel> GetAllClientes();
        ClienteModel GetCliente(int id);
        string PostCliente(ClientePostModel clienteInserido);
        string PutCliente(ClientePutModel clienteAlterado);
        string DeleteCliente(int id);
    }
}
