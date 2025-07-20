import React, { useState, useEffect, useRef } from 'react';
import ProfessorForm from '../components/ProfessorForm'
import { professores as initialProfessores, disciplinas as initialDisciplinas } from '../data'; 

function ProfessoresPage() {
  const loadData = (key, initialData) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initialData;
  };

  const [professores, setProfessores] = useState(() => loadData('professores', initialProfessores));
  const [disciplinas] = useState(() => loadData('disciplinas', initialDisciplinas));

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [professorToEdit, setProfessorToEdit] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('professores', JSON.stringify(professores));
  }, [professores]);

  useEffect(() => {
      if (isFormVisible && formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, [isFormVisible]);

  const handleSave = (professorData) => {
    if(professorData.id) {
      const updateProfessores = professores.map(professor => professor.id === professorData.id ? professorData : professor
      );
      setProfessores(updateProfessores);
    } else {
      const newId = professores.length > 0 ? Math.max(...professores.map(professor => professor.id)) +1 : 101;
      const novoProfessor = { ...professorData, id: newId };
      setProfessores([...professores, novoProfessor]);
    }

    setIsFormVisible(false);
    setProfessorToEdit(null);
  };

  const handleCreateNew = () => {
    setProfessorToEdit(null);
    setIsFormVisible(true);
  }

  const handleEdit = (professor) => {
    setProfessorToEdit(professor);
    setIsFormVisible(true);
  }

  const handleCancel = () => {
    setIsFormVisible(false);
    setProfessorToEdit(null);
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      const updateProfessores = professores.filter(professor => professor.id !== id);
      setProfessores(updateProfessores);
      console.log('Professor com ID ' + id + ' excluído.');
    }
  }
  return (
    <div>
      <h1>Professores</h1>
      
      <ul>
        {professores.map(professor => (
          <li key={professor.id}>
            <div className='list-item-info'>
              <div>{professor.nome}</div>
              <div>E-mail: {professor.email}</div>
              <div>Disciplina: {disciplinas.find(d => d.id === Number(professor.disciplinaId))?.nome || null}</div>
            </div>
            <div class='button-container'>
              <button onClick={() => handleEdit(professor)}>Editar</button>
              <button onClick={() => handleDelete(professor.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleCreateNew} style={{ marginBottom: '1.5rem', marginTop: '1rem'}} >Adicionar Novo Professor</button>
      {isFormVisible && (
        <div ref={formRef}>
        <ProfessorForm
          professor={professorToEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        </div>
      )}
    </div>
  );
}

export default ProfessoresPage;