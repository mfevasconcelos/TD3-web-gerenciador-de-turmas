using Microsoft.AspNetCore.Mvc;
using GerenciadorDeTurmas.API.Models;
using GerenciadorDeTurmas.API.Services;

namespace GerenciadorDeTurmas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunosController : ControllerBase
    {
        private readonly AlunoService _alunoService;

        public AlunosController(AlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_alunoService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var aluno = _alunoService.GetById(id);
            if (aluno == null) return NotFound();
            return Ok(aluno);
        }

        [HttpPost]
        public IActionResult Create(Aluno novoAluno)
        {
            var alunoCriado = _alunoService.Create(novoAluno);
            return CreatedAtAction(nameof(GetById), new { id = alunoCriado.Id }, alunoCriado);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Aluno alunoAtualizado)
        {
            if (id != alunoAtualizado.Id) return BadRequest();
            if (_alunoService.GetById(id) == null) return NotFound();

            _alunoService.Update(alunoAtualizado);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_alunoService.GetById(id) == null) return NotFound();

            _alunoService.Delete(id);
            return NoContent();
        }
    }
}