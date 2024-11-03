using api.Interfaces;
using api.Models.Estado;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadosController : ControllerBase
    {
        private readonly IEstadosService estadosService;

        public EstadosController(IEstadosService pIEstadosService)
        {
            this.estadosService = pIEstadosService;
        }

        [HttpGet]
        [Route("/GetAllEstados")]
        public ActionResult<IEnumerable<EstadoModel>> GetAllEstados()
        {
            IEnumerable<EstadoModel> result = estadosService.GetAllEstados();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetEstado")]
        public IActionResult GetEstado(int id)
        {
            EstadoModel result = estadosService.GetEstado(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostEstado")]
        public IActionResult PostEstado([FromBody] EstadoPostModel estadoInserido)
        {
            try
            {
                string result = estadosService.PostEstado(estadoInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O estado já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutEstado")]
        public IActionResult PutEstado([FromBody] EstadoPutModel estadoAlterado)
        {
            try
            {
                string result = estadosService.PutEstado(estadoAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O estado já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteEstado")]
        public IActionResult DeleteEstado(int id)
        {
            try
            {
                string result = estadosService.DeleteEstado(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir o estado pois ele tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
