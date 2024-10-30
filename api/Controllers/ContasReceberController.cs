using api.Interfaces;
using api.Models.ContaReceber;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContasReceberController : ControllerBase
    {
        private readonly IContasReceberService contasReceberService;

        public ContasReceberController(IContasReceberService pIContasReceberService)
        {
            this.contasReceberService = pIContasReceberService;
        }

        [HttpGet]
        [Route("/GetAllContasReceber")]
        public ActionResult<IEnumerable<ContaReceberModel>> GetAllContasReceber()
        {
            IEnumerable<ContaReceberModel> result = contasReceberService.GetAllContasReceber();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetContaReceber")]
        public IActionResult GetContaReceber(int id)
        {
            ContaReceberModel result = contasReceberService.GetContaReceber(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/ReceberConta")]
        public IActionResult ReceberConta([FromBody] ContaReceberPutModel contaRecebida)
        {
            string result = contasReceberService.ReceberConta(contaRecebida);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
       
        [HttpPut]
        [Route("/ReabrirConta")]
        public IActionResult ReabrirConta(int id)
        {
            string result = contasReceberService.ReabrirConta(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
