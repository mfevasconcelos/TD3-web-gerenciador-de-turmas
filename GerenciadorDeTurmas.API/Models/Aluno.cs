namespace GerenciadorDeTurmas.API.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Matricula { get; set; } = string.Empty;
        public int TurmaId { get; set; }
    }
}