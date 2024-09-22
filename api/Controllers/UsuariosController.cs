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
        [Route("/GetAllUsuariosAtivos")]
        public ActionResult<IEnumerable<UsuarioModel>> GetAllUsuariosAtivos()
        {
            IEnumerable<UsuarioModel> result = usuariosService.GetAllUsuariosAtivos();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
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
        public IActionResult DeleteUsuario(int id)
        {
            string result = usuariosService.DeleteUsuario(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
