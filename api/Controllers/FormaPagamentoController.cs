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
        [Route("/GetAllFormasPagamentoAtivas")]
        public ActionResult<IEnumerable<FormaPagamentoModel>> GetAllFormasPagamentoAtivas()
        {
            IEnumerable<FormaPagamentoModel> result = formaPagamentoService.GetAllFormasPagamentoAtivas();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetAllFormasPagamento")]
        public ActionResult<IEnumerable<FormaPagamentoModel>> GetAllFormasPagamento()
        {
            IEnumerable<FormaPagamentoModel> result = formaPagamentoService.GetAllFormasPagamento();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetFormaPagamento")]
        public IActionResult GetFormasPagamento(int id)
        {
            FormaPagamentoModel result = formaPagamentoService.GetFormaPagamento(id);
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
        public IActionResult DeleteFormaPagamento(int id)
        {
            string result = formaPagamentoService.DeleteFormaPagamento(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
