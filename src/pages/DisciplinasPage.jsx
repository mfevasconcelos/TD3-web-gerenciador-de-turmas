import React, { useState, useEffect, useRef } from 'react';
import DisciplinaForm from '../components/DisciplinaForm.jsx';
import { disciplinas as initialDisciplinas } from '../data'; 

function DisciplinasPage() {
  const [disciplinas, setDisciplinas] = useState(() => {
    const savedDisciplinas = localStorage.getItem('disciplinas');
    return savedDisciplinas ? JSON.parse(savedDisciplinas) : initialDisciplinas;
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [disciplinaToEdit, setDisciplinaToEdit] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
  }, [disciplinas]);

  useEffect(() => {
        if (isFormVisible && formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, [isFormVisible]);

  const handleSave = (disciplinaData) => {
    if (disciplinaData.id) {
      const updatedDisciplinas = disciplinas.map(disciplina =>
        disciplina.id === disciplinaData.id ? disciplinaData : disciplina
      );
      setDisciplinas(updatedDisciplinas);
    } else {
      const newId = disciplinas.length > 0 ? Math.max(...disciplinas.map(disciplina => disciplina.id)) + 1 : 1;
      const novaDisciplina = { ...disciplinaData, id: newId };
      setDisciplinas([...disciplinas, novaDisciplina]);
    }

    setIsFormVisible(false); 
    setDisciplinaToEdit(null);
  };

  const handleCreateNew = () => {
    setDisciplinaToEdit(null);
    setIsFormVisible(true);
  };

  const handleEdit = (disciplina) => {
    setDisciplinaToEdit(disciplina);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setDisciplinaToEdit(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
      const updatedDisciplinas = disciplinas.filter(disciplina => disciplina.id !== id);
      setDisciplinas(updatedDisciplinas);
      console.log('Disciplina com ID ' + id + ' excluída.');
    }
  };

  return (
    <div>
      <h1>Disciplinas</h1>
      
      <ul>
        {disciplinas.map(disciplina => (
          <li key={disciplina.id}>
            <div className='list-item-info'>
              <div>{disciplina.nome}</div>
              <div>Carga Horária: {disciplina.cargaHoraria}h</div>
            </div>
            <div className='button-container'>
              <button onClick={() => handleEdit(disciplina)}>Editar</button>
              <button onClick={() => handleDelete(disciplina.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleCreateNew} style={{ marginBottom: '1.5rem', marginTop: '1rem'}} >Adicionar Nova Disciplina</button>
      {isFormVisible && (
        <div ref={formRef}>
        <DisciplinaForm 
          disciplina={disciplinaToEdit} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
        </div>
      )}
    </div>
  );
}

export default DisciplinasPage;