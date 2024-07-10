using api.Interfaces;
using api.Models.Cliente;
using api.Models.Usuario;
using api.Services;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IClientesService clientesService;

        public ClientesController(IClientesService pIClientesService)
        {
            this.clientesService = pIClientesService;
        }

        [HttpGet]
        [Route("/GetAllClientes")]
        public ActionResult<IEnumerable<ClienteModel>> GetAllClientes(int ativo)
        {
            IEnumerable<ClienteModel> result = clientesService.GetAllClientes(ativo);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetCliente")]
        public IActionResult GetCliente(int cliente_ID)
        {
            ClienteModel result = clientesService.GetCliente(cliente_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetAllUsuariosFromCliente")]
        public ActionResult<IEnumerable<UsuarioGetFromClienteModel>> GetAllUsuariosFromCliente(int cliente_ID)
        {
            IEnumerable<UsuarioGetFromClienteModel> result = clientesService.GetAllUsuariosFromCliente(cliente_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostCliente")]
        public IActionResult PostCliente([FromBody] ClientePostModel clienteInserido)
        {
            string result = clientesService.PostCliente(clienteInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutCliente")]
        public IActionResult PutUsuario([FromBody] ClientePutModel clienteAlterado)
        {
            string result = clientesService.PutCliente(clienteAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteCliente")]
        public IActionResult DeleteCliente(int cliente_ID)
        {
            string result = clientesService.DeleteCliente(cliente_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
