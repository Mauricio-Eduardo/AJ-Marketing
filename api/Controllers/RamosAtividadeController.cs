using api.Interfaces;
using api.Models.RamosAtividade;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RamosAtividadeController : ControllerBase
    {
        private readonly IRamosAtividadeService ramosService;

        public RamosAtividadeController(IRamosAtividadeService pIRamosAtividadeService)
        {
            this.ramosService = pIRamosAtividadeService;
        }

        [HttpGet]
        [Route("/GetAllRamosAtividade")]
        public ActionResult<IEnumerable<RamoAtividadeModel>> GetAllRamosAtividade()
        {
            IEnumerable<RamoAtividadeModel> result = ramosService.GetAllRamosAtividade();
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetRamoAtividade")]
        public IActionResult GetRamoAtividade(int id)
        {
            RamoAtividadeModel result = ramosService.GetRamoAtividade(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostRamoAtividade")]
        public IActionResult PostRamoAtividade([FromBody] RamoAtividadePostModel ramoInserido)
        {
            string result = ramosService.PostRamoAtividade(ramoInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutRamoAtividade")]
        public IActionResult PutRamoAtividade([FromBody] RamoAtividadePutModel ramoAlterado)
        {
            string result = ramosService.PutRamoAtividade(ramoAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteRamoAtividade")]
        public IActionResult DeleteRamoAtividade(int id)
        {
            string result = ramosService.DeleteRamoAtividade(id);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
