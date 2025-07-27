import React, { useState, useEffect, useRef } from 'react';
import TurmaForm from '../components/TurmaForm.jsx';

const API_BASE_URL = "/api";

function TurmasPage() {
  const [turmas, setTurmas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [turmaToEdit, setTurmaToEdit] = useState(null);
  const formRef = useRef(null);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    fetchData('turmas', setTurmas);
    fetchData('professores', setProfessores);
    fetchData('alunos', setAlunos);
    fetchData('disciplinas', setDisciplinas);
  }, []);

  useEffect(() => {
    if (isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isFormVisible]);

  const handleSave = async (turmaData) => {
    const isUpdating = !!turmaData.id;
    const url = isUpdating ? `${API_BASE_URL}/turmas/${turmaData.id}` : `${API_BASE_URL}/turmas`;
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turmaData),
      });
      fetchData('turmas', setTurmas); 
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
    }

    setIsFormVisible(false);
    setTurmaToEdit(null);
  };

  const handleCreateNew = () => {
    setTurmaToEdit(null);
    setIsFormVisible(true);
  };

  const handleEdit = (turma) => {
    setTurmaToEdit(turma);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setTurmaToEdit(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
      try {
        await fetch(`${API_BASE_URL}/turmas/${id}`, { method: 'DELETE' });
        fetchData('turmas', setTurmas); 
        console.log('Turma com ID ' + id + ' excluída.');
      } catch (error) {
        console.error("Erro ao deletar turma:", error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '0' }}>Turmas</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {turmas.map(turma => (
          <div key={turma.id} style={{ padding: '1rem', flex: 1, minWidth: '400px' }}>
            <h2>{turma.nome}</h2>
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '33.33%' }}>Professores</th>
                  <th style={{ width: '33.33%' }}>Alunos</th>
                  <th style={{ width: '33.33%' }}>Disciplinas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className='list-item-info'>
                      <ul style={{ paddingLeft: '1rem', margin: 0, listStyle: 'none' }}>
                        {turma.professorIds.map(id => {
                          const professor = professores.find(p => p.id === id);
                          return professor ? <li key={id}>{professor.nome}</li> : null;
                        })}
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className='list-item-info'>
                      <ul style={{ paddingLeft: '1rem', margin: 0, listStyle: 'none' }}>
                        {turma.alunoIds.map(id => {
                          const aluno = alunos.find(a => a.id === id);
                          return aluno ? <li key={id}>{aluno.nome}</li> : null;
                        })}
                      </ul>
                    </div>
                  </td>
                  <td>
                    <div className='list-item-info'>
                      <ul style={{ paddingLeft: '1rem', margin: 0, listStyle: 'none' }}>
                        {turma.disciplinaIds.map(id => {
                          const disciplina = disciplinas.find(d => d.id === id);
                          return disciplina ? <li key={id}>{disciplina.nome}</li> : null;
                        })}
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='button-container' style={{ marginTop: '1rem' }}>
              <button onClick={() => handleEdit(turma)}>Editar</button>
              <button onClick={() => handleDelete(turma.id)}>Deletar</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCreateNew} style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
        Adicionar Nova Turma
      </button>
      {isFormVisible && (
        <div ref={formRef}>
          <TurmaForm
            turma={turmaToEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            professores={professores}
            alunos={alunos}
            disciplinas={disciplinas}
          />
        </div>
      )}
    </div>
  );
}

export default TurmasPage;