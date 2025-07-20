import React, { useState, useEffect } from 'react';
import '../App.css';

const TurmaForm = ({ turma, onSave, onCancel, alunos, professores, disciplinas }) => {
  const [formData, setFormData] = useState({
    nome: '',
    professorIds: [],
    alunoIds: [],
    disciplinaIds: [],
  });

  useEffect(() => {
    if (turma) {
      setFormData({
        ...turma,
        professorIds: turma.professorIds || [],
        alunoIds: turma.alunoIds || [],
        disciplinaIds: turma.disciplinaIds || [],
      });
    }
  }, [turma]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData(prev => ({
      ...prev,
      [e.target.name]: selectedValues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="turma-form">
      <fieldset className="turma-fieldset">
        <legend className="turma-legend">Informações da Turma</legend>

        <div className="turma-field">
          <label htmlFor="nome">Nome da Turma:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome da turma"
          />
        </div>

        <div className="turma-field">
          <label htmlFor="professores">Professores:</label>
          <select
            id="professores"
            name="professorIds"
            multiple
            value={formData.professorIds}
            onChange={handleMultiSelectChange}
          >
            {professores.map(professor => (
              <option key={professor.id} value={professor.id}>
                {professor.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="turma-field">
          <label htmlFor="alunos">Alunos:</label>
          <select
            id="alunos"
            name="alunoIds"
            multiple
            value={formData.alunoIds}
            onChange={handleMultiSelectChange}
          >
            {alunos.map(aluno => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="turma-field">
          <label htmlFor="disciplinas">Disciplinas:</label>
          <select
            id="disciplinas"
            name="disciplinaIds"
            multiple
            value={formData.disciplinaIds}
            onChange={handleMultiSelectChange}
          >
            {disciplinas.map(disciplina => (
              <option key={disciplina.id} value={disciplina.id}>
                {disciplina.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="turma-buttons">
          <button type="submit" className="save">Salvar</button>
          <button type="button" className="cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </fieldset>
    </form>
  );
};

export default TurmaForm;