export const disciplinas = [
  { id: 1, nome: 'Matemática', cargaHoraria: 60 },
  { id: 2, nome: 'Português', cargaHoraria: 60 },
  { id: 3, nome: 'História', cargaHoraria: 40 },
  { id: 4, nome: 'Ciências', cargaHoraria: 40 },
];

export const professores = [
  { id: 101, nome: 'Ana Thalita', email: 'ana.thalita@escola.com', disciplinaId: 1 }, 
  { id: 102, nome: 'Carlos Eduardo', email: 'carlos.eduardo@escola.com', disciplinaId: 2 },
  { id: 103, nome: 'Victor Manoel', email: 'victor.manoel@escola.com', disciplinaId: 3 },
];

export const alunos = [
  { id: 201, nome: 'Marcos Victor', matricula: '2025001', turmaId: 301 }, 
  { id: 202, nome: 'Maria Liz', matricula: '2025002', turmaId: 301 },
  { id: 203, nome: 'Lara Beatriz', matricula: '2025003', turmaId: 302 },
];

export const turmas = [
  { id: 301, nome: 'Turma A - 1º Ano', professorIds: [101, 102], alunoIds: [201, 202], disciplinaIds: [1, 2, 3] },
  { id: 302, nome: 'Turma B - 2º Ano', professorIds: [103], alunoIds: [203], disciplinaIds: [3, 4] },
];