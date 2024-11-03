using api.Interfaces;
using api.Models.País;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisesController : ControllerBase
    {
        private readonly IPaisesService paisesService;

        public PaisesController(IPaisesService pIPaisesService)
        {
            this.paisesService = pIPaisesService;
        }

        [HttpGet]
        [Route("/GetAllPaises")]
        public ActionResult<IEnumerable<PaisModel>> GetAllPaises()
        {
            IEnumerable<PaisModel> result = paisesService.GetAllPaises();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetPais")]
        public IActionResult GetPais(int id)
        {
            PaisModel result = paisesService.GetPais(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostPais")]
        public IActionResult PostPais([FromBody] PaisPostModel paisInserido)
        {
            try
            {
                string result = paisesService.PostPais(paisInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O país já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutPais")]
        public IActionResult PutPais([FromBody] PaisPutModel paisAlterado)
        {
            try
            {
                string result = paisesService.PutPais(paisAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O país já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeletePais")]
        public IActionResult DeletePais(int id)
        {
            try
            {
                string result = paisesService.DeletePais(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir o país pois ele tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
