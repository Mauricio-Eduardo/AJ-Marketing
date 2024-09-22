using api.Interfaces;
using api.Models.Interesse;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteressesController : ControllerBase
    {
        private readonly IInteressesService interessesService;

        public InteressesController(IInteressesService pIInteressesService)
        {
            this.interessesService = pIInteressesService;
        }

        [HttpGet]
        [Route("/GetAllInteresses")]
        public ActionResult<IEnumerable<InteresseModel>> GetAllInteresses()
        {
            IEnumerable<InteresseModel> result = interessesService.GetAllInteresses();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetInteresse")]
        public IActionResult GetInteresse(int id)
        {
            InteresseModel result = interessesService.GetInteresse(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostInteresse")]
        public IActionResult PostInteresse([FromBody] InteressePostModel interesseInserido)
        {
            string result = interessesService.PostInteresse(interesseInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutInteresse")]
        public IActionResult PutInteresse([FromBody] InteressePutModel interesseAlterado)
        {
            string result = interessesService.PutInteresse(interesseAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteInteresse")]
        public IActionResult DeleteInteresse(int id)
        {
            string result = interessesService.DeleteInteresse(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
