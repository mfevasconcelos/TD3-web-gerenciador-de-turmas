namespace GerenciadorDeTurmas.API.Models
{
    public class Turma
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;

        public List<int> ProfessorIds { get; set; } = new List<int>();
        public List<int> AlunoIds { get; set; } = new List<int>();
        public List<int> DisciplinaIds { get; set; } = new List<int>();
    }
}