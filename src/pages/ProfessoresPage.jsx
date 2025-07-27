import React, { useState, useEffect, useRef } from 'react';
import ProfessorForm from '../components/ProfessorForm';

const API_URL = "/api/professores";

function ProfessoresPage() {
  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [professorToEdit, setProfessorToEdit] = useState(null);
  const formRef = useRef(null);

  const fetchProfessores = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProfessores(data);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  };

  const fetchDisciplinas = async () => {
    try {
      const response = await fetch("/api/disciplinas");
      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  };

  useEffect(() => {
    fetchProfessores();
    fetchDisciplinas(); 
  }, []);

  useEffect(() => {
    if (isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isFormVisible]);

  const handleSave = async (professorData) => {
    const isUpdating = !!professorData.id;
    const url = isUpdating ? `${API_URL}/${professorData.id}` : API_URL;
    const method = isUpdating ? 'PUT' : 'POST';

    const dataToSend = {
      ...professorData,
      disciplinaId: Number(professorData.disciplinaId)
    };

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      fetchProfessores(); 
    } catch (error) {
      console.error("Erro ao salvar professor:", error);
    }

    setIsFormVisible(false);
    setProfessorToEdit(null);
  };

  const handleCreateNew = () => {
    setProfessorToEdit(null);
    setIsFormVisible(true);
  };

  const handleEdit = (professor) => {
    setProfessorToEdit(professor);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setProfessorToEdit(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchProfessores(); 
        console.log('Professor com ID ' + id + ' excluído.');
      } catch (error) {
        console.error("Erro ao deletar professor:", error);
      }
    }
  };

  return (
    <div>
      <h1>Professores</h1>
      <ul>
        {professores.map(professor => (
          <li key={professor.id}>
            <div className='list-item-info'>
              <div>{professor.nome}</div>
              <div>E-mail: {professor.email}</div>
              <div>Disciplina: {disciplinas.find(d => d.id === Number(professor.disciplinaId))?.nome || 'Não encontrada'}</div>
            </div>
            <div className='button-container'>
              <button onClick={() => handleEdit(professor)}>Editar</button>
              <button onClick={() => handleDelete(professor.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleCreateNew} style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>Adicionar Novo Professor</button>
      {isFormVisible && (
        <div ref={formRef}>
          <ProfessorForm
            professor={professorToEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            disciplinas={disciplinas}
          />
        </div>
      )}
    </div>
  );
}

export default ProfessoresPage;