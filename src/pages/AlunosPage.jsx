import React, { useState, useEffect, useRef } from 'react';
import AlunoForm from '../components/AlunoForm';
import { alunos as initialAlunos, turmas as initialTurmas } from '../data';

function AlunosPage() {
  const loadData = (key, initialData) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initialData;
  };

  const [alunos, setAlunos] = useState(() => loadData('alunos', initialAlunos));
  const [turmas, setTurmas] = useState(() => loadData('turmas', initialTurmas));

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [alunoToEdit, setAlunoToEdit] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('alunos', JSON.stringify(alunos));
  }, [alunos]);
  useEffect(() => {
    localStorage.setItem('turmas', JSON.stringify(turmas));
  }, [turmas]);

  useEffect(() => {
          if (isFormVisible && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, [isFormVisible]);

  const handleSave = (alunoData) => {
    let updatedTurmas = JSON.parse(JSON.stringify(turmas)); 
    if (alunoData.id) {
      const originalAluno = alunos.find(a => a.id === alunoData.id);
      const newTurmaId = Number(alunoData.turmaId);
      if (originalAluno && Number(originalAluno.turmaId) !== newTurmaId) {
        const oldTurma = updatedTurmas.find(t => t.id === Number(originalAluno.turmaId));
        if (oldTurma) {
          oldTurma.alunoIds = oldTurma.alunoIds.filter(id => id !== alunoData.id);
        }
      }

      const newTurma = updatedTurmas.find(t => t.id === newTurmaId);
      if (newTurma && !newTurma.alunoIds.includes(alunoData.id)) {
        newTurma.alunoIds.push(alunoData.id);
      }
      const updatedAlunos = alunos.map(aluno =>
        aluno.id === alunoData.id ? { ...alunoData, turmaId: newTurmaId } : aluno
      );
      setAlunos(updatedAlunos);
    } else {
      const newId = alunos.length > 0 ? Math.max(...alunos.map(aluno => aluno.id)) + 1 : 201;
      const newTurmaId = Number(alunoData.turmaId);
      const novoAluno = { ...alunoData, id: newId, turmaId: newTurmaId };
      const turmaParaAdicionar = updatedTurmas.find(t => t.id === newTurmaId);
      if (turmaParaAdicionar) {
        turmaParaAdicionar.alunoIds.push(newId);
      }
      setAlunos([...alunos, novoAluno]);
    }

    setTurmas(updatedTurmas);
    setIsFormVisible(false);
    setAlunoToEdit(null);
  };

  const handleCreateNew = () => {
    setAlunoToEdit(null);
    setIsFormVisible(true);
  };

  const handleEdit = (aluno) => {
    setAlunoToEdit(aluno);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setAlunoToEdit(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      const alunoToDelete = alunos.find(aluno => aluno.id === id);
      if (!alunoToDelete) return;

      if (alunoToDelete.turmaId) {
        const updatedTurmas = turmas.map(turma => {
          if (turma.id === Number(alunoToDelete.turmaId)) {
            return { ...turma, alunoIds: turma.alunoIds.filter(alunoId => alunoId !== id) };
          }
          return turma;
        });
        setTurmas(updatedTurmas);
      }

      const updatedAlunos = alunos.filter(aluno => aluno.id !== id);
      setAlunos(updatedAlunos);

      console.log('Aluno com ID ' + id + ' excluído.');
    }
  };

  return (
    <div>
      <h1>Alunos</h1>

      <ul>
        {alunos.map(aluno => (
          <li key={aluno.id}>
            <div className='list-item-info'>
              <div>{aluno.nome}</div>
              <div>Matrícula: {aluno.matricula}</div>
              <div>Turma: {turmas.find(d => d.id === Number(aluno.turmaId))?.nome || 'Não encontrada'}</div>
            </div>
            <div className='button-container'>
              <button onClick={() => handleEdit(aluno)}>Editar</button>
              <button onClick={() => handleDelete(aluno.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleCreateNew} style={{ marginBottom: '1.5rem', marginTop: '1rem'}} >Adicionar Novo Aluno</button>
      
      {isFormVisible && (
        <div ref={formRef}>
        <AlunoForm 
          aluno={alunoToEdit}
          turmas={turmas} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
        </div>
      )}
    </div>
  );
}

export default AlunosPage;