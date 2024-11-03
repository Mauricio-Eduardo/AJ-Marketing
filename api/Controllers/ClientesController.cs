using api.Interfaces;
using api.Models.Cliente;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


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
            try
            {
                string result = clientesService.PostCliente(clienteInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O cliente já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutCliente")]
        public IActionResult PutUsuario([FromBody] ClientePutModel clienteAlterado)
        {
            try
            {
                string result = clientesService.PutCliente(clienteAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O cliente já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteCliente")]
        public IActionResult DeleteCliente(int id)
        {
            try
            {
                string result = clientesService.DeleteCliente(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir o cliente pois ele tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
