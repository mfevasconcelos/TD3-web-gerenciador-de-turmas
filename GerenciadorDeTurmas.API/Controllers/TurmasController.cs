using Microsoft.AspNetCore.Mvc;
using GerenciadorDeTurmas.API.Models;
using GerenciadorDeTurmas.API.Services;

namespace GerenciadorDeTurmas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TurmasController : ControllerBase
    {
        private readonly TurmaService _turmaService;

        public TurmasController(TurmaService turmaService)
        {
            _turmaService = turmaService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_turmaService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var turma = _turmaService.GetById(id);
            if (turma == null) return NotFound();
            return Ok(turma);
        }

        [HttpPost]
        public IActionResult Create(Turma novaTurma)
        {
            var turmaCriada = _turmaService.Create(novaTurma);
            return CreatedAtAction(nameof(GetById), new { id = turmaCriada.Id }, turmaCriada);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Turma turmaAtualizada)
        {
            if (id != turmaAtualizada.Id) return BadRequest();
            if (_turmaService.GetById(id) == null) return NotFound();

            _turmaService.Update(turmaAtualizada);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_turmaService.GetById(id) == null) return NotFound();

            _turmaService.Delete(id);
            return NoContent();
        }
    }
}