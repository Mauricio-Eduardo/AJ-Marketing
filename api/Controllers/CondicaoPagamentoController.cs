using api.Interfaces;
using api.Models.CondicaoPagamento;
using api.Models.FormaPagamento;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CondicaoPagamentoController : ControllerBase
    {
        private readonly ICondicaoPagamentoService condicaoPagamentoService;

        public CondicaoPagamentoController(ICondicaoPagamentoService pICondicaoPagamentoService)
        {
            this.condicaoPagamentoService = pICondicaoPagamentoService;
        }

        [HttpGet]
        [Route("/GetAllCondicoesPagamentoAtivas")]
        public ActionResult<IEnumerable<CondicaoPagamentoModel>> GetAllCondicoesPagamentoAtivas()
        {
            IEnumerable<CondicaoPagamentoModel> result = condicaoPagamentoService.GetAllCondicoesPagamentoAtivas();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetAllCondicoesPagamento")]
        public ActionResult<IEnumerable<CondicaoPagamentoModel>> GetAllCondicoesPagamento()
        {
            IEnumerable<CondicaoPagamentoModel> result = condicaoPagamentoService.GetAllCondicoesPagamento();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetCondicaoPagamento")]
        public IActionResult GetCondicaoPagamento(int id)
        {
            CondicaoPagamentoModel result = condicaoPagamentoService.GetCondicaoPagamento(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostCondicaoPagamento")]
        public IActionResult PostCondicaoPagamento([FromBody] CondicaoPagamentoPostModel condicaoPagInserida)
        {
            string result = condicaoPagamentoService.PostCondicaoPagamento(condicaoPagInserida);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutCondicaoPagamento")]
        public IActionResult PutCondicaoPagamento([FromBody] CondicaoPagamentoPutModel condicaoPagAlterada)
        {
            string result = condicaoPagamentoService.PutCondicaoPagamento(condicaoPagAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteCondicaoPagamento")]
        public IActionResult DeleteCondicaoPagamento(int id)
        {
            string result = condicaoPagamentoService.DeleteCondicaoPagamento(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
