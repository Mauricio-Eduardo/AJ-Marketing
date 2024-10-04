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
        [Route("/GetAllOrdensServico")]
        public ActionResult<IEnumerable<OrdemServicoModel>> GetAllOrdensServico()
        {
            IEnumerable<OrdemServicoModel> result = ordensServicoService.GetAllOrdensServico();
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
        [Route("/PutOrdemServico")]
        public IActionResult PutOrdemServico([FromBody] OrdemServicoPutModel contaAlterada)
        {
            string result = ordensServicoService.PutOrdemServico(contaAlterada);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
