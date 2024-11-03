using api.Models.Usuario;

namespace api.Interfaces
{
    public interface IUsuariosService
    {
        IEnumerable<UsuarioModel> GetAllUsuarios();
        UsuarioModel GetUsuario(int id);
        string PostUsuario(UsuarioPostModel usuarioInserido);
        string PutUsuario(UsuarioPutModel usuarioAlterado);
        string DeleteUsuario(int id, int novoUsuario_id);
    }
}
