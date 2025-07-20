import React, { useState, useEffect, useRef } from 'react';
import TurmaForm from '../components/TurmaForm.jsx';
import { 
  turmas as initialTurmas, 
  professores as initialProfessores, 
  alunos as initialAlunos, 
  disciplinas as initialDisciplinas 
} from '../data'; 

function TurmasPage() {
  const loadData = (key, initialData) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initialData;
  };

  const [turmas, setTurmas] = useState(() => loadData('turmas', initialTurmas));
  const [professores, setProfessores] = useState(() => loadData('professores', initialProfessores));
  const [alunos, setAlunos] = useState(() => loadData('alunos', initialAlunos));
  const [disciplinas, setDisciplinas] = useState(() => loadData('disciplinas', initialDisciplinas));

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [turmaToEdit, setTurmaToEdit] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('turmas', JSON.stringify(turmas));
  }, [turmas]);
  
  useEffect(() => {
    if (!localStorage.getItem('professores')) localStorage.setItem('professores', JSON.stringify(initialProfessores));
    if (!localStorage.getItem('alunos')) localStorage.setItem('alunos', JSON.stringify(initialAlunos));
    if (!localStorage.getItem('disciplinas')) localStorage.setItem('disciplinas', JSON.stringify(initialDisciplinas));
  }, []);

  useEffect(() => {
    if (isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isFormVisible]);

  const handleSave = (turmaData) => {
    const disciplineIdsFromProfessors = turmaData.professorIds
      .map(profId => {
        const professor = professores.find(p => p.id === profId); //
        return professor ? Number(professor.disciplinaId) : null;
      })
      .filter(id => id !== null);

    const combinedDisciplineIds = new Set([
      ...turmaData.disciplinaIds,
      ...disciplineIdsFromProfessors
    ]);

    const finalTurmaData = {
      ...turmaData,
      disciplinaIds: Array.from(combinedDisciplineIds)
    };

    if (finalTurmaData.id) {
      const updatedTurmas = turmas.map(turma =>
        turma.id === finalTurmaData.id ? finalTurmaData : turma
      );
      setTurmas(updatedTurmas);
    } else {
      const newId = turmas.length > 0 ? Math.max(...turmas.map(turma => turma.id)) + 1 : 301;
      const novaTurma = { ...finalTurmaData, id: newId };
      setTurmas([...turmas, novaTurma]);
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

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
      const updatedTurmas = turmas.filter(turma => turma.id !== id);
      setTurmas(updatedTurmas);
      console.log('Turma com ID ' + id + ' excluída.');
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
                        const professor = professores.find(p => p.id === id); //
                        return professor ? <li key={id}>{professor.nome}</li> : null;
                      })}
                    </ul>
                    </div>
                  </td>
                  <td>
                    <div className='list-item-info'>
                    <ul style={{ paddingLeft: '1rem', margin: 0, listStyle: 'none' }}>
                      {turma.alunoIds.map(id => {
                        const aluno = alunos.find(a => a.id === id); //
                        return aluno ? <li key={id}>{aluno.nome}</li> : null;
                      })}
                    </ul>
                    </div>
                  </td>
                  <td>
                    <div className='list-item-info'>
                    <ul style={{ paddingLeft: '1rem', margin: 0, listStyle: 'none' }}>
                      {turma.disciplinaIds.map(id => {
                        const disciplina = disciplinas.find(d => d.id === id); //
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
      <button onClick={handleCreateNew} style={{ marginBottom: '1.5rem', marginTop: '1rem'}}>
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