import React, { useState, useEffect } from 'react';
import '../App.css'; // reutilizando o CSS de TurmaForm e ProfessorForm

const DisciplinaForm = ({ disciplina, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cargaHoraria: '',
  });

  useEffect(() => {
    if (disciplina) {
      setFormData(disciplina);
    }
  }, [disciplina]);

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
        <legend className="turma-legend">Informações da Disciplina</legend>

        <div className="turma-field">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome da disciplina"
          />
        </div>

        <div className="turma-field">
          <label htmlFor="cargaHoraria">Carga Horária:</label>
          <input
            type="text"
            id="cargaHoraria"
            name="cargaHoraria"
            value={formData.cargaHoraria}
            onChange={handleChange}
            required
            placeholder="Ex: 60"
          />
        </div>

        <div className="turma-buttons">
          <button type="submit" className="save">Salvar</button>
          <button type="button" className="cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </fieldset>
    </form>
  );
};

export default DisciplinaForm;
