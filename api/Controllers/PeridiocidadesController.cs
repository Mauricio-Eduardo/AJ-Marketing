using api.Interfaces;
using api.Models.Peridiocidade;
using Microsoft.AspNetCore.Mvc;


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
            string result = peridiocidadesService.PostPeridiocidade(peridiocidadeInserida);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutPeridiocidade")]
        public IActionResult PutPeridiocidade([FromBody] PeridiocidadePutModel peridiocidadeAlterada)
        {
            string result = peridiocidadesService.PutPeridiocidade(peridiocidadeAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeletePeridiocidade")]
        public IActionResult DeletePeridiocidade(int id)
        {
            string result = peridiocidadesService.DeletePeridiocidade(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
