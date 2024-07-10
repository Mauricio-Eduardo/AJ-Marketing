using api.Models.Cliente;
using api.Models.Parcelas;
using api.Models.Usuario;
using System.Data.SqlClient;

namespace api.Interfaces
{
    public interface IClientesService
    {
        IEnumerable<ClienteModel> GetAllClientes(int ativo);
        ClienteModel GetCliente(int cliente_ID);
        IEnumerable<UsuarioGetFromClienteModel> GetAllUsuariosFromCliente(int cliente_ID);
        string PostCliente(ClientePostModel clienteInserido);
        string PutCliente(ClientePutModel clienteAlterado);
        string DeleteCliente(int usuario_ID);
    }
}
