using api.Interfaces;
using api.Models.Usuario;
using Microsoft.AspNetCore.Mvc;


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
        public ActionResult<IEnumerable<UsuarioModel>> GetAllUsuarios(int ativo)
        {
            IEnumerable<UsuarioModel> result = usuariosService.GetAllUsuarios(ativo);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetUsuario")]
        public IActionResult GetUsuario(int usuario_ID)
        {
            UsuarioModel result = usuariosService.GetUsuario(usuario_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostUsuario")]
        public IActionResult PostUsuario([FromBody] UsuarioPostModel usuarioInserido)
        {
            string result = usuariosService.PostUsuario(usuarioInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutUsuario")]
        public IActionResult PutUsuario([FromBody] UsuarioPutModel usuarioAlterado)
        {
            string result = usuariosService.PutUsuario(usuarioAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteUsuario")]
        public IActionResult DeleteUsuario(int usuario_ID)
        {
            string result = usuariosService.DeleteUsuario(usuario_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
