import React, { useState, useEffect, useRef } from 'react';
import AlunoForm from '../components/AlunoForm';

const ALUNOS_API_URL = "/api/alunos";
const TURMAS_API_URL = "/api/turmas";

function AlunosPage() {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [alunoToEdit, setAlunoToEdit] = useState(null);
  const formRef = useRef(null);

  const fetchAlunos = async () => {
    try {
      const response = await fetch(ALUNOS_API_URL);
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const fetchTurmas = async () => {
    try {
      const response = await fetch(TURMAS_API_URL);
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  };

  useEffect(() => {
    fetchAlunos();
    fetchTurmas();
  }, []);

  useEffect(() => {
    if (isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isFormVisible]);

  const handleSave = async (alunoData) => {
    const isUpdating = !!alunoData.id;
    const url = isUpdating ? `${ALUNOS_API_URL}/${alunoData.id}` : ALUNOS_API_URL;
    const method = isUpdating ? 'PUT' : 'POST';

    const dataToSend = {
      ...alunoData,
      turmaId: Number(alunoData.turmaId)
    };

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      fetchAlunos(); 
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }

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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        await fetch(`${ALUNOS_API_URL}/${id}`, { method: 'DELETE' });
        fetchAlunos(); 
        console.log('Aluno com ID ' + id + ' excluído.');
      } catch (error) {
        console.error("Erro ao deletar aluno:", error);
      }
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
              <div>Turma: {turmas.find(t => t.id === Number(aluno.turmaId))?.nome || 'Não encontrada'}</div>
            </div>
            <div className='button-container'>
              <button onClick={() => handleEdit(aluno)}>Editar</button>
              <button onClick={() => handleDelete(aluno.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleCreateNew} style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>Adicionar Novo Aluno</button>

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