using api.Interfaces;
using api.Models.Cidade;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CidadesController : ControllerBase
    {
        private readonly ICidadesService cidadesService;

        public CidadesController(ICidadesService pICidadesService)
        {
            this.cidadesService = pICidadesService;
        }

        [HttpGet]
        [Route("/GetAllCidades")]
        public ActionResult<IEnumerable<CidadeModel>> GetAllCidades()
        {
            IEnumerable<CidadeModel> result = cidadesService.GetAllCidades();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetCidade")]
        public IActionResult GetCidade(int id)
        {
            CidadeModel result = cidadesService.GetCidade(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostCidade")]
        public IActionResult PostCidade([FromBody] CidadePostModel cidadeInserida)
        {
            try
            {
                string result = cidadesService.PostCidade(cidadeInserida);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A cidade já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutCidade")]
        public IActionResult PutCidade([FromBody] CidadePutModel cidadeAlterada)
        {
            try
            {
                string result = cidadesService.PutCidade(cidadeAlterada);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A cidade já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteCidade")]
        public IActionResult DeleteCidade(int id)
        {
            try
            {
                string result = cidadesService.DeleteCidade(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir a cidade pois ela tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
