import React, { useState, useEffect } from 'react';
import { disciplinas } from '../data';
import '../App.css'; 

const ProfessorForm = ({ professor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    disciplinaId: '',
  });

  useEffect(() => {
    if (professor) {
      setFormData(professor);
    }
  }, [professor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="turma-form">
      <fieldset className="turma-fieldset">
        <legend className="turma-legend">Informações do Professor</legend>

        <div className="turma-field">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome do professor"
          />
        </div>

        <div className="turma-field">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Digite o e-mail"
          />
        </div>

        <div className="turma-field">
          <label htmlFor="disciplinaId">Disciplina:</label>
          <select
            id="disciplinaId"
            name="disciplinaId"
            value={formData.disciplinaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map(d => (
              <option key={d.id} value={d.id}>
                {d.nome}
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

export default ProfessorForm;
