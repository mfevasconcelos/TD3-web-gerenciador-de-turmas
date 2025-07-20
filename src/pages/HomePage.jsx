import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { 
  alunos as initialAlunos, 
  professores as initialProfessores, 
  disciplinas as initialDisciplinas, 
  turmas as initialTurmas 
} from '../data'; 

const HomePage = () => {
  const loadData = (key, initialData) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initialData;
  };

  const totalAlunos = loadData('alunos', initialAlunos).length;
  const totalProfessores = loadData('professores', initialProfessores).length;
  const totalDisciplinas = loadData('disciplinas', initialDisciplinas).length;
  const totalTurmas = loadData('turmas', initialTurmas).length;

  return (
    <div className="dashboard-container">
      <h1>Gerenciador de Turmas</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{totalAlunos}</h2>
          <p>Alunos Cadastrados</p>
        </div>
        <div className="stat-card">
          <h2>{totalProfessores}</h2>
          <p>Professores</p>
        </div>
        <div className="stat-card">
          <h2>{totalDisciplinas}</h2>
          <p>Disciplinas</p>
        </div>
        <div className="stat-card">
          <h2>{totalTurmas}</h2>
          <p>Turmas Abertas</p>
        </div>
      </div>

      <div className="quick-access-container">
        <Link to="/alunos" className="quick-access-button">
          Gerenciar Alunos
        </Link>
        <Link to="/professores" className="quick-access-button">
          Gerenciar Professores
        </Link>
        <Link to="/turmas" className="quick-access-button">
          Administrar Turmas
        </Link>
      </div>
    </div>
  );
};

export default HomePage;