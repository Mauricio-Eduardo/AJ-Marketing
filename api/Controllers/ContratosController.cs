using api.Interfaces;
using api.Models.Contratos;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContratosController : ControllerBase
    {
        private readonly IContratosService contratosService;

        public ContratosController(IContratosService pIContratosService)
        {
            this.contratosService = pIContratosService;
        }

        [HttpGet]
        [Route("/GetAllContratos")]
        public ActionResult<IEnumerable<ContratoModel>> GetAllContratos()
        {
            IEnumerable<ContratoModel> result = contratosService.GetAllContratos();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetContrato")]
        public IActionResult GetContrato(int id)
        {
            ContratoModel result = contratosService.GetContrato(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostContrato")]
        public IActionResult PostContrato([FromBody] ContratoPostModel contratoInserido)
        {
            string result = contratosService.PostContrato(contratoInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/CancelarContrato")]
        public IActionResult CancelarContrato(int id)
        {
            string result = contratosService.CancelarContrato(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
