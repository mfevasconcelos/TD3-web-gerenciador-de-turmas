namespace GerenciadorDeTurmas.API.Models {
    public class Professor
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int DisciplinaId { get; set; }
    }
}