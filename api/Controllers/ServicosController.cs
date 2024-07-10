using api.Interfaces;
using api.Models.Serviços;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicosController : ControllerBase
    {
        private readonly IServicosService servicosService;

        public ServicosController(IServicosService pIServicosService)
        {
            this.servicosService = pIServicosService;
        }

        [HttpGet]
        [Route("/GetAllServicos")]
        public ActionResult<IEnumerable<ServicoModel>> GetAllServicos(int ativo)
        {
            IEnumerable<ServicoModel> result = servicosService.GetAllServicos(ativo);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet]
        [Route("/GetServico")]
        public IActionResult GetServico(int servico_ID)
        {
            ServicoModel result = servicosService.GetServico(servico_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("/PostServico")]
        public IActionResult PostServico([FromBody] ServicoPostModel servicoInserido)
        {
            string result = servicosService.PostServico(servicoInserido);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpPut]
        [Route("/PutServico")]
        public IActionResult PutServico([FromBody] ServicoPutModel servicoAlterado)
        {
            string result = servicosService.PutServico(servicoAlterado);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("/DeleteServico")]
        public IActionResult DeleteServico(int servico_ID)
        {
            string result = servicosService.DeleteServico(servico_ID);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}
