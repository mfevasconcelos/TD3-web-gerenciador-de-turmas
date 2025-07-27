import React, { useState, useEffect, useRef } from 'react';
import DisciplinaForm from '../components/DisciplinaForm.jsx';
// import { disciplinas as initialDisciplinas } from '../data'; 

const API_URL = "/api/disciplinas";

function DisciplinasPage() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [disciplinaToEdit, setDisciplinaToEdit] = useState(null);
  const formRef = useRef(null);

  const fetchDisciplinas = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []); 

  useEffect(() => {
    if (isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isFormVisible]);

  const handleSave = async (disciplinaData) => {
    try {
      const isUpdating = !!disciplinaData.id;
      const url = isUpdating ? `${API_URL}/${disciplinaData.id}` : API_URL;
      const method = isUpdating ? 'PUT' : 'POST';

      await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(disciplinaData),
      });

      fetchDisciplinas();

    } catch (error) {
      console.error("Erro ao salvar disciplina:", error);
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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        fetchDisciplinas();
        console.log('Disciplina com ID ' + id + ' excluída.');
      } catch (error) {
        console.error("Erro ao deletar disciplina:", error);
      }
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