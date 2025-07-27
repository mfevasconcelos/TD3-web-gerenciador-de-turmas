using GerenciadorDeTurmas.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace GerenciadorDeTurmas.API.Services
{
    public class TurmaService
    {
        private static readonly List<Turma> _turmas = new List<Turma>
        {
            new Turma 
            { 
                Id = 301, 
                Nome = "Turma A - 1º Ano", 
                ProfessorIds = new List<int> { 101, 102 }, 
                AlunoIds = new List<int> { 201, 202 }, 
                DisciplinaIds = new List<int> { 1, 2, 3 } 
            },
            new Turma 
            { 
                Id = 302, 
                Nome = "Turma B - 2º Ano", 
                ProfessorIds = new List<int> { 103 }, 
                AlunoIds = new List<int> { 203 }, 
                DisciplinaIds = new List<int> { 3, 4 } 
            }
        };

        public List<Turma> GetAll()
        {
            return _turmas;
        }

        public Turma? GetById(int id)
        {
            return _turmas.FirstOrDefault(t => t.Id == id);
        }

        public Turma Create(Turma novaTurma)
        {
            var novoId = _turmas.Any() ? _turmas.Max(t => t.Id) + 1 : 301;
            novaTurma.Id = novoId;
            _turmas.Add(novaTurma);
            return novaTurma;
        }

        public void Update(Turma turmaAtualizada)
        {
            var index = _turmas.FindIndex(t => t.Id == turmaAtualizada.Id);
            if (index != -1)
            {
                _turmas[index] = turmaAtualizada;
            }
        }

        public void Delete(int id)
        {
            var turma = GetById(id);
            if (turma != null)
            {
                _turmas.Remove(turma);
            }
        }
    }
}