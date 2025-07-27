import React, { useState, useEffect } from 'react';
import '../App.css'; 

const AlunoForm = ({ aluno, turmas = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    turmaId: '',
  });

  useEffect(() => {
    if (aluno) {
      setFormData(aluno);
    }
  }, [aluno]);

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
        <legend className="turma-legend">Informações do Aluno</legend>

        <div className="turma-field">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome do aluno"
          />
        </div>

        <div className="turma-field">
          <label htmlFor="matricula">Matrícula:</label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            required
            placeholder="Ex: 202501234"
          />
        </div>

        <div className="turma-field">
          <label htmlFor="turmaId">Turma:</label>
          <select
            id="turmaId"
            name="turmaId"
            value={formData.turmaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma turma</option>
            {turmas && turmas.map(turma => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
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

export default AlunoForm;