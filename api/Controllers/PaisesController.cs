using api.Interfaces;
using api.Models.País;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisesController : ControllerBase
    {
        private readonly IPaisesService paisesService;

        public PaisesController(IPaisesService pIPaisesService)
        {
            this.paisesService = pIPaisesService;
        }

        [HttpGet]
        [Route("/GetAllPaisesAtivos")]
        public ActionResult<IEnumerable<PaisModel>> GetAllPaisesAtivos()
        {
            IEnumerable<PaisModel> result = paisesService.GetAllPaisesAtivos();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetAllPaises")]
        public ActionResult<IEnumerable<PaisModel>> GetAllPaises()
        {
            IEnumerable<PaisModel> result = paisesService.GetAllPaises();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetPais")]
        public IActionResult GetPais(int id)
        {
            PaisModel result = paisesService.GetPais(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostPais")]
        public IActionResult PostPais([FromBody] PaisPostModel paisInserido)
        {
            string result = paisesService.PostPais(paisInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutPais")]
        public IActionResult PutPais([FromBody] PaisPutModel paisAlterado)
        {
            string result = paisesService.PutPais(paisAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeletePais")]
        public IActionResult DeletePais(int id)
        {
            string result = paisesService.DeletePais(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
