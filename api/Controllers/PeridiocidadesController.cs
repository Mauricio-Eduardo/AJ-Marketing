using api.Interfaces;
using api.Models.Peridiocidade;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeridiocidadesController : ControllerBase
    {
        private readonly IPeridiocidadesService peridiocidadesService;

        public PeridiocidadesController(IPeridiocidadesService pIPeridiocidadesService)
        {
            this.peridiocidadesService = pIPeridiocidadesService;
        }

        [HttpGet]
        [Route("/GetAllPeridiocidades")]
        public ActionResult<IEnumerable<PeridiocidadeModel>> GetAllPeridiocidades()
        {
            IEnumerable<PeridiocidadeModel> result = peridiocidadesService.GetAllPeridiocidades();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetPeridiocidade")]
        public IActionResult GetPeridiocidade(int id)
        {
            PeridiocidadeModel result = peridiocidadesService.GetPeridiocidade(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostPeridiocidade")]
        public IActionResult PostPeridiocidade([FromBody] PeridiocidadePostModel peridiocidadeInserida)
        {
            try
            {
                string result = peridiocidadesService.PostPeridiocidade(peridiocidadeInserida);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A peridiocidade já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutPeridiocidade")]
        public IActionResult PutPeridiocidade([FromBody] PeridiocidadePutModel peridiocidadeAlterada)
        {
            try
            {
                string result = peridiocidadesService.PutPeridiocidade(peridiocidadeAlterada);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A peridiocidade já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeletePeridiocidade")]
        public IActionResult DeletePeridiocidade(int id)
        {
            try
            {
                string result = peridiocidadesService.DeletePeridiocidade(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir a peridiocidade pois ela tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
