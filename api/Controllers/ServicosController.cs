using api.Interfaces;
using api.Models.Serviços;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicosController : ControllerBase
    {
        private readonly IServicosService servicosService;

        public ServicosController(IServicosService pIServicosService)
        {
            this.servicosService = pIServicosService;
        }

        [HttpGet]
        [Route("/GetAllServicos")]
        public ActionResult<IEnumerable<ServicoModel>> GetAllServicos()
        {
            IEnumerable<ServicoModel> result = servicosService.GetAllServicos();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetServico")]
        public IActionResult GetServico(int id)
        {
            ServicoModel result = servicosService.GetServico(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostServico")]
        public IActionResult PostServico([FromBody] ServicoPostModel servicoInserido)
        {
            try
            {
                string result = servicosService.PostServico(servicoInserido);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O serviço já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutServico")]
        public IActionResult PutServico([FromBody] ServicoPutModel servicoAlterado)
        {
            try
            {
                string result = servicosService.PutServico(servicoAlterado);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("O serviço já está cadastrado."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteServico")]
        public IActionResult DeleteServico(int id)
        {
            try
            {
                string result = servicosService.DeleteServico(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir o serviço pois ele tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
