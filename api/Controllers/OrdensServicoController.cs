using api.Interfaces;
using api.Models.OrdemServico;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdemServicoController : ControllerBase
    {
        private readonly IOrdensServicoService ordensServicoService;

        public OrdemServicoController(IOrdensServicoService pIOrdensServicoService)
        {
            this.ordensServicoService = pIOrdensServicoService;
        }

        [HttpGet]
        [Route("/GetAllOrdens")]
        public ActionResult<IEnumerable<OrdemServicoModel>> GetAllOrdensServico(string situacao)
        {
            IEnumerable<OrdemServicoModel> result = ordensServicoService.GetAllOrdens(situacao);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetAllPostados")]
        public ActionResult<IEnumerable<OrdemServicoModel>> GetAllPostados()
        {
            IEnumerable<OrdemServicoModel> result = ordensServicoService.GetAllPostados();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetOrdemServico")]
        public IActionResult GetOrdemServico(int id)
        {
            OrdemServicoModel result = ordensServicoService.GetOrdemServico(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutOrdemServico")]
        public IActionResult PutOrdemServico([FromBody] OrdemServicoPutModel contaAlterada)
        {
            string result = ordensServicoService.PutOrdemServico(contaAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/IniciarPausar")]
        public IActionResult IniciarPausar(int id, string situacao)
        {
            string result = ordensServicoService.IniciarPausar(id, situacao);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/Entregar")]
        public IActionResult Entregar(int id)
        {
            string result = ordensServicoService.Entregar(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/Postar")]
        public IActionResult Postar(int id)
        {
            string result = ordensServicoService.Postar(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
