using api.Interfaces;
using api.Models.Cliente;
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
        public ActionResult<IEnumerable<ClienteModel>> GetAllClientes()
        {
            IEnumerable<ClienteModel> result = clientesService.GetAllClientes();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetCliente")]
        public IActionResult GetCliente(int id)
        {
            ClienteModel result = clientesService.GetCliente(id);
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
        public IActionResult DeleteCliente(int id)
        {
            string result = clientesService.DeleteCliente(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
