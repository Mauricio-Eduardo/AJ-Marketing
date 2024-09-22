using api.Interfaces;
using api.Models.Cidade;
using Microsoft.AspNetCore.Mvc;


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
        [Route("/GetAllCidadesAtivas")]
        public ActionResult<IEnumerable<CidadeModel>> GetAllCidadesAtivas()
        {
            IEnumerable<CidadeModel> result = cidadesService.GetAllCidadesAtivas();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
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
            string result = cidadesService.PostCidade(cidadeInserida);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutCidade")]
        public IActionResult PutCidade([FromBody] CidadePutModel cidadeAlterada)
        {
            string result = cidadesService.PutCidade(cidadeAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteCidade")]
        public IActionResult DeleteCidade(int id)
        {
            string result = cidadesService.DeleteCidade(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
