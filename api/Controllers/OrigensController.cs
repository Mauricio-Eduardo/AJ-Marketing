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
        [Route("/GetAllOrigensAtivas")]
        public ActionResult<IEnumerable<OrigemModel>> GetAllOrigensAtivas()
        {
            IEnumerable<OrigemModel> result = origensService.GetAllOrigensAtivas();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetAllOrigens")]
        public ActionResult<IEnumerable<OrigemModel>> GetAllOrigens()
        {
            IEnumerable<OrigemModel> result = origensService.GetAllOrigens();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetOrigem")]
        public IActionResult GetOrigem(int id)
        {
            OrigemModel result = origensService.GetOrigem(id);
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
        public IActionResult DeleteOrigem(int id)
        {
            string result = origensService.DeleteOrigem(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
