using api.Interfaces;
using api.Models.Estado;
using Microsoft.AspNetCore.Mvc;


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
        [Route("/GetAllEstadosAtivos")]
        public ActionResult<IEnumerable<EstadoModel>> GetAllEstadosAtivos()
        {
            IEnumerable<EstadoModel> result = estadosService.GetAllEstadosAtivos();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
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
            string result = estadosService.PostEstado(estadoInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutEstado")]
        public IActionResult PutEstado([FromBody] EstadoPutModel estadoAlterado)
        {
            string result = estadosService.PutEstado(estadoAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteEstado")]
        public IActionResult DeleteEstado(int id)
        {
            string result = estadosService.DeleteEstado(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
