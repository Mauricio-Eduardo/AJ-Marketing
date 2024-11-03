using api.Interfaces;
using api.Models.FormaPagamento;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

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
            try
            {
                string result = formaPagamentoService.PostFormaPagamento(formaPagInserida);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A forma de pagamento já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpPut]
        [Route("/PutFormaPagamento")]
        public IActionResult PutFormaPagamento([FromBody] FormaPagamentoPutModel formaPagAlterada)
        {
            try
            {
                string result = formaPagamentoService.PutFormaPagamento(formaPagAlterada);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return Conflict("A forma de pagamento já está cadastrada."); // 409 Conflict
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("/DeleteFormaPagamento")]
        public IActionResult DeleteFormaPagamento(int id)
        {
            try
            {
                string result = formaPagamentoService.DeleteFormaPagamento(id);
                return StatusCode(200, result);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                return Conflict("Não é possível excluir a forma de pagamento pois ela tem relações com outros registros.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro inesperado: " + ex.Message);
            }
        }
    }
}
