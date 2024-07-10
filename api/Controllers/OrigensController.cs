using api.Interfaces;
using api.Models.Origem;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrigensController : ControllerBase
    {
        private readonly IOrigensService origensService;

        public OrigensController(IOrigensService pIOrigensService)
        {
            this.origensService = pIOrigensService;
        }

        [HttpGet]
        [Route("/GetAllOrigens")]
        public ActionResult<IEnumerable<OrigemModel>> GetAllOrigens(int ativo)
        {
            IEnumerable<OrigemModel> result = origensService.GetAllOrigens(ativo);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetOrigem")]
        public IActionResult GetOrigem(int origem_ID)
        {
            OrigemModel result = origensService.GetOrigem(origem_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostOrigem")]
        public IActionResult PostOrigem([FromBody] OrigemPostModel origemInserido)
        {
            string result = origensService.PostOrigem(origemInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutOrigem")]
        public IActionResult PutOrigem([FromBody] OrigemPutModel origemAlterado)
        {
            string result = origensService.PutOrigem(origemAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteOrigem")]
        public IActionResult DeleteOrigem(int origem_ID)
        {
            string result = origensService.DeleteOrigem(origem_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
