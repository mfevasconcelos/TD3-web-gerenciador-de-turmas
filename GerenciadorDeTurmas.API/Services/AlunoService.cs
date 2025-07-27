using GerenciadorDeTurmas.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace GerenciadorDeTurmas.API.Services
{
    public class AlunoService
    {
        private static readonly List<Aluno> _alunos = new List<Aluno>
        {
            new Aluno { Id = 201, Nome = "Marcos Victor", Matricula = "2025001", TurmaId = 301 },
            new Aluno { Id = 202, Nome = "Maria Liz", Matricula = "2025002", TurmaId = 301 },
            new Aluno { Id = 203, Nome = "Lara Beatriz", Matricula = "2025003", TurmaId = 302 },
        };

        public List<Aluno> GetAll()
        {
            return _alunos;
        }

        public Aluno? GetById(int id)
        {
            return _alunos.FirstOrDefault(a => a.Id == id);
        }

        public Aluno Create(Aluno novoAluno)
        {
            var novoId = _alunos.Any() ? _alunos.Max(a => a.Id) + 1 : 201;
            novoAluno.Id = novoId;
            _alunos.Add(novoAluno);
            return novoAluno;
        }

        public void Update(Aluno alunoAtualizado)
        {
            var index = _alunos.FindIndex(a => a.Id == alunoAtualizado.Id);
            if (index != -1)
            {
                _alunos[index] = alunoAtualizado;
            }
        }

        public void Delete(int id)
        {
            var aluno = GetById(id);
            if (aluno != null)
            {
                _alunos.Remove(aluno);
            }
        }
    }
}