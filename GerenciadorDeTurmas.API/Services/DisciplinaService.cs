using GerenciadorDeTurmas.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace GerenciadorDeTurmas.API.Services
{
    public class DisciplinaService
    {
        private static readonly List<Disciplina> _disciplinas = new List<Disciplina>
        {
            new Disciplina { Id = 1, Nome = "Matemática", CargaHoraria = 60 },
            new Disciplina { Id = 2, Nome = "Português", CargaHoraria = 60 },
            new Disciplina { Id = 3, Nome = "História", CargaHoraria = 40 },
            new Disciplina { Id = 4, Nome = "Ciências", CargaHoraria = 40 }
        };

        public List<Disciplina> GetAll()
        {
            return _disciplinas;
        }

        public Disciplina? GetById(int id)
        {
            return _disciplinas.FirstOrDefault(d => d.Id == id);
        }

        public Disciplina Create(Disciplina novaDisciplina)
        {
            var novoId = _disciplinas.Any() ? _disciplinas.Max(d => d.Id) + 1 : 1;
            novaDisciplina.Id = novoId;
            _disciplinas.Add(novaDisciplina);
            return novaDisciplina;
        }

        public void Update(Disciplina disciplinaAtualizada)
        {
            var index = _disciplinas.FindIndex(d => d.Id == disciplinaAtualizada.Id);
            if (index != -1)
            {
                _disciplinas[index] = disciplinaAtualizada;
            }
        }

        public void Delete(int id)
        {
            var disciplina = GetById(id);
            if (disciplina != null)
            {
                _disciplinas.Remove(disciplina);
            }
        }
    }
}