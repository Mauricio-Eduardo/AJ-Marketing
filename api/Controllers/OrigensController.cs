using api.Interfaces;
using api.Models.Origem;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrigensController : ControllerBase
    {
        private readonly IOrigensService origensService;

        public OrigensController(IOrigensService pIOrigensService)
        {
            this.origensService = pIOrigensService;
        }

        [HttpGet]
        [Route("/GetAllOrigens")]
        public ActionResult<IEnumerable<OrigemModel>> GetAllOrigens()
        {
            IEnumerable<OrigemModel> result = origensService.GetAllOrigens();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetOrigem")]
        public IActionResult GetOrigem(int id)
        {
            OrigemModel result = origensService.GetOrigem(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostOrigem")]
        public IActionResult PostOrigem([FromBody] OrigemPostModel origemInserido)
        {
            try
            {
                string result = origensService.PostOrigem(origemInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A origem já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutOrigem")]
        public IActionResult PutOrigem([FromBody] OrigemPutModel origemAlterado)
        {
            try
            {
                string result = origensService.PutOrigem(origemAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A origem já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteOrigem")]
        public IActionResult DeleteOrigem(int id)
        {
            try
            {
                string result = origensService.DeleteOrigem(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir a origem pois ela tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
