using api.Interfaces;
using api.Models.FormaPagamento;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormaPagamentoController : ControllerBase
    {
        private readonly IFormaPagamentoService formaPagamentoService;

        public FormaPagamentoController(IFormaPagamentoService pIFormaPagamentoService)
        {
            this.formaPagamentoService = pIFormaPagamentoService;
        }

        [HttpGet]
        [Route("/GetAllFormasPagamento")]
        public ActionResult<IEnumerable<FormaPagamentoModel>> GetAllFormasPagamento(int ativo)
        {
            IEnumerable<FormaPagamentoModel> result = formaPagamentoService.GetAllFormasPagamento(ativo);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetFormaPagamento")]
        public IActionResult GetFormasPagamento(int formaPag_ID)
        {
            FormaPagamentoModel result = formaPagamentoService.GetFormaPagamento(formaPag_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostFormaPagamento")]
        public IActionResult PostFormaPagamento([FromBody] FormaPagamentoPostModel formaPagInserida)
        {
            string result = formaPagamentoService.PostFormaPagamento(formaPagInserida);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutFormaPagamento")]
        public IActionResult PutFormaPagamento([FromBody] FormaPagamentoPutModel formaPagAlterada)
        {
            string result = formaPagamentoService.PutFormaPagamento(formaPagAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteFormaPagamento")]
        public IActionResult DeleteFormaPagamento(int formaPag_ID)
        {
            string result = formaPagamentoService.DeleteFormaPagamento(formaPag_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
