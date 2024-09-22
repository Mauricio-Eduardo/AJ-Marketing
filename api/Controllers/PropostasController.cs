using api.Interfaces;
using api.Models.Proposta;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropostasController : ControllerBase
    {
        private readonly IPropostasService propostasService;

        public PropostasController(IPropostasService pIPropostasService)
        {
            this.propostasService = pIPropostasService;
        }

        [HttpGet]
        [Route("/GetAllPropostas")]
        public ActionResult<IEnumerable<PropostaModel>> GetAllPropostas()
        {
            IEnumerable<PropostaModel> result = propostasService.GetAllPropostas();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetProposta")]
        public IActionResult GetProposta(int id)
        {
            PropostaModel result = propostasService.GetProposta(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostProposta")]
        public IActionResult PostProposta([FromBody] PropostaPostModel propostaInserida)
        {
            string result = propostasService.PostProposta(propostaInserida);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutProposta")]
        public IActionResult PutProposta([FromBody] PropostaPutModel propostaAlterada)
        {
            string result = propostasService.PutProposta(propostaAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/AtualizarSituacaoProposta")]
        public IActionResult AtualizarSituacaoProposta(int id, string situacao)
        {
            string result = propostasService.AtualizarSituacaoProposta(id, situacao);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
