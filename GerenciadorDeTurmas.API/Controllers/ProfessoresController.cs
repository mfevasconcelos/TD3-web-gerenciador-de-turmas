using Microsoft.AspNetCore.Mvc;
using GerenciadorDeTurmas.API.Models;
using GerenciadorDeTurmas.API.Services;

namespace GerenciadorDeTurmas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessoresController : ControllerBase
    {
        private readonly ProfessorService _professorService;

        public ProfessoresController(ProfessorService professorService)
        {
            _professorService = professorService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_professorService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var professor = _professorService.GetById(id);
            if (professor == null) return NotFound();
            return Ok(professor);
        }

        [HttpPost]
        public IActionResult Create(Professor novoProfessor)
        {
            var professorCriado = _professorService.Create(novoProfessor);
            return CreatedAtAction(nameof(GetById), new { id = professorCriado.Id }, professorCriado);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Professor professorAtualizado)
        {
            if (id != professorAtualizado.Id) return BadRequest();
            if (_professorService.GetById(id) == null) return NotFound();

            _professorService.Update(professorAtualizado);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_professorService.GetById(id) == null) return NotFound();

            _professorService.Delete(id);
            return NoContent();
        }
    }
}