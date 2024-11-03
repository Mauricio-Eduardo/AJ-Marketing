using api.Interfaces;
using api.Models.Interesse;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteressesController : ControllerBase
    {
        private readonly IInteressesService interessesService;

        public InteressesController(IInteressesService pIInteressesService)
        {
            this.interessesService = pIInteressesService;
        }

        [HttpGet]
        [Route("/GetAllInteresses")]
        public ActionResult<IEnumerable<InteresseModel>> GetAllInteresses()
        {
            IEnumerable<InteresseModel> result = interessesService.GetAllInteresses();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetInteresse")]
        public IActionResult GetInteresse(int id)
        {
            InteresseModel result = interessesService.GetInteresse(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostInteresse")]
        public IActionResult PostInteresse([FromBody] InteressePostModel interesseInserido)
        {
            try
            {
                string result = interessesService.PostInteresse(interesseInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O interesse já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutInteresse")]
        public IActionResult PutInteresse([FromBody] InteressePutModel interesseAlterado)
        {
            try
            {
                string result = interessesService.PutInteresse(interesseAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O interesse já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteInteresse")]
        public IActionResult DeleteInteresse(int id)
        {
            try
            {
                string result = interessesService.DeleteInteresse(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir o interesse pois ele tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
