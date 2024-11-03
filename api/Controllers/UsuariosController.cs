using api.Interfaces;
using api.Models.Usuario;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuariosService usuariosService;

        public UsuariosController(IUsuariosService pIUsuariosService)
        {
            this.usuariosService = pIUsuariosService;
        }


        [HttpGet]
        [Route("/GetAllUsuarios")]
        public ActionResult<IEnumerable<UsuarioModel>> GetAllUsuarios()
        {
            IEnumerable<UsuarioModel> result = usuariosService.GetAllUsuarios();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetUsuario")]
        public IActionResult GetUsuario(int id)
        {
            UsuarioModel result = usuariosService.GetUsuario(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostUsuario")]
        public IActionResult PostUsuario([FromBody] UsuarioPostModel usuarioInserido)
        {
            try
            {
                string result = usuariosService.PostUsuario(usuarioInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O usuário já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutUsuario")]
        public IActionResult PutUsuario([FromBody] UsuarioPutModel usuarioAlterado)
        {
            try
            {
                string result = usuariosService.PutUsuario(usuarioAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O usuário já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteUsuario")]
        public IActionResult DeleteUsuario(int id, int novoUsuario_id   )
        {
            try
            {
                string result = usuariosService.DeleteUsuario(id, novoUsuario_id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir o usuário pois ele tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
