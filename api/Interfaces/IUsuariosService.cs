using api.Models.Usuario;

namespace api.Interfaces
{
    public interface IUsuariosService
    {
        IEnumerable<UsuarioModel> GetAllUsuarios(int ativo);
        UsuarioModel GetUsuario(int usuario_ID);
        string PostUsuario(UsuarioPostModel usuarioInserido);
        string PutUsuario(UsuarioPutModel usuarioAlterado);
        string DeleteUsuario(int usuario_ID);
    }
}
