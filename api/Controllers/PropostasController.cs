using api.Interfaces;
using api.Models.Proposta;
using api.Models.PropostaServico;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;


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

        [HttpGet]
        [Route("/GetServicosFromProposta")]
        public IActionResult GetServicosFromProposta(int id)
        {
            List<PropostaServicoModel> result = propostasService.GetServicosFromProposta(id);
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
        public IActionResult AtualizarSituacaoProposta([FromBody] PropostaAtualizaModel propostaAtualizada)
        {
            string result = propostasService.AtualizarSituacaoProposta(propostaAtualizada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
