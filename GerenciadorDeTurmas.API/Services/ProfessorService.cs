using GerenciadorDeTurmas.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace GerenciadorDeTurmas.API.Services {
    public class ProfessorService {
        private static readonly List<Professor> _professores = new List<Professor> {
            new Professor { Id = 101, Nome = "Ana Thalita", Email = "ana.thalita@escola.com", DisciplinaId = 1 },
            new Professor { Id = 102, Nome = "Carlos Eduardo", Email = "carlos.eduardo@escola.com", DisciplinaId = 2 },
            new Professor { Id = 103, Nome = "Victor Manoel", Email = "victor.manoel@escola.com", DisciplinaId = 3 }
        };

        public List<Professor> GetAll() {
            return _professores;
        }

        public Professor? GetById(int id) {
            return _professores.FirstOrDefault(p => p.Id == id);
        }

        public Professor Create(Professor novoProfessor) {
            var novoId = _professores.Any() ? _professores.Max(p => p.Id) + 1 : 101;
            novoProfessor.Id = novoId;
            _professores.Add(novoProfessor);
            return novoProfessor;
        }

        public void Update(Professor professorAtualizado) {
            var index = _professores.FindIndex(p => p.Id == professorAtualizado.Id);
            if (index != -1) {
                _professores[index] = professorAtualizado;
            }
        }

        public void Delete(int id) {
            var professor = GetById(id);
            if (professor != null) {
                _professores.Remove(professor);
            }
        }
    }
}