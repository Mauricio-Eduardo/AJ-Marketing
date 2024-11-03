using api.Interfaces;
using api.Models.RamosAtividade;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RamosAtividadeController : ControllerBase
    {
        private readonly IRamosAtividadeService ramosService;

        public RamosAtividadeController(IRamosAtividadeService pIRamosAtividadeService)
        {
            this.ramosService = pIRamosAtividadeService;
        }

        [HttpGet]
        [Route("/GetAllRamosAtividade")]
        public ActionResult<IEnumerable<RamoAtividadeModel>> GetAllRamosAtividade()
        {
            IEnumerable<RamoAtividadeModel> result = ramosService.GetAllRamosAtividade();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetRamoAtividade")]
        public IActionResult GetRamoAtividade(int id)
        {
            RamoAtividadeModel result = ramosService.GetRamoAtividade(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostRamoAtividade")]
        public IActionResult PostRamoAtividade([FromBody] RamoAtividadePostModel ramoInserido)
        {
            try
            {
                string result = ramosService.PostRamoAtividade(ramoInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O ramo de atividade já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutRamoAtividade")]
        public IActionResult PutRamoAtividade([FromBody] RamoAtividadePutModel ramoAlterado)
        {
            try
            {
                string result = ramosService.PutRamoAtividade(ramoAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O ramo de atividade já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteRamoAtividade")]
        public IActionResult DeleteRamoAtividade(int id)
        {
            try
            {
                string result = ramosService.DeleteRamoAtividade(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir o ramo de atividade pois ele tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
