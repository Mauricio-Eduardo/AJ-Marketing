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
        [Route("/GetAllPaises")]
        public ActionResult<IEnumerable<PaisModel>> GetAllUsuarios(int ativo)
        {
            IEnumerable<PaisModel> result = paisesService.GetAllPaises(ativo);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetPais")]
        public IActionResult GetPais(int pais_ID)
        {
            PaisModel result = paisesService.GetPais(pais_ID);
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
        public IActionResult DeletePais(int pais_ID)
        {
            string result = paisesService.DeletePais(pais_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
