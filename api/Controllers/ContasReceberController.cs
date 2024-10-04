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

        //[HttpPost]
        //[Route("/PostContaReceber")]
        //public IActionResult PostContaReceber([FromBody] ContaReceberPostModel contaInserida)
        //{
        //    string result = contasReceberService.PostContaReceber(contaInserida);
        //    if (result != null)
        //        return Ok(result);
        //    else
        //        return BadRequest();
        //}

        [HttpPut]
        [Route("/PutContaReceber")]
        public IActionResult PutContaReceber([FromBody] ContaReceberPutModel contaAlterada)
        {
            string result = contasReceberService.PutContaReceber(contaAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
