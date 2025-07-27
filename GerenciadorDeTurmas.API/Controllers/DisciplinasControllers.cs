using Microsoft.AspNetCore.Mvc;
using GerenciadorDeTurmas.API.Models;
using GerenciadorDeTurmas.API.Services; 

namespace GerenciadorDeTurmas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinasController : ControllerBase
    {
        private readonly DisciplinaService _disciplinaService;

        public DisciplinasController(DisciplinaService disciplinaService)
        {
            _disciplinaService = disciplinaService;
        }

        // GET: api/disciplinas
        [HttpGet]
        public IActionResult GetAll()
        {
            var disciplinas = _disciplinaService.GetAll();
            return Ok(disciplinas);
        }

        // GET: api/disciplinas/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var disciplina = _disciplinaService.GetById(id);
            if (disciplina == null)
            {
                return NotFound();
            }
            return Ok(disciplina);
        }

        // POST: api/disciplinas
        [HttpPost]
        public IActionResult Create(Disciplina novaDisciplina)
        {
            var disciplinaCriada = _disciplinaService.Create(novaDisciplina);
            return CreatedAtAction(nameof(GetById), new { id = disciplinaCriada.Id }, disciplinaCriada);
        }

        // PUT: api/disciplinas/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, Disciplina disciplinaAtualizada)
        {
            if (id != disciplinaAtualizada.Id)
            {
                return BadRequest();
            }

            var disciplinaExistente = _disciplinaService.GetById(id);
            if (disciplinaExistente == null)
            {
                return NotFound();
            }

            _disciplinaService.Update(disciplinaAtualizada);
            return NoContent();
        }

        // DELETE: api/disciplinas/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var disciplina = _disciplinaService.GetById(id);
            if (disciplina == null)
            {
                return NotFound();
            }

            _disciplinaService.Delete(id);
            return NoContent();
        }
    }
}