import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
// import { 
//   alunos as initialAlunos, 
//   professores as initialProfessores, 
//   disciplinas as initialDisciplinas, 
//   turmas as initialTurmas 
// } from '../data'; 

const API_BASE_URL = "/api";

const HomePage = () => {
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [totalProfessores, setTotalProfessores] = useState(0);
  const [totalDisciplinas, setTotalDisciplinas] = useState(0);
  const [totalTurmas, setTotalTurmas] = useState(0);

  const fetchCount = async (endpoint, setter) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      const data = await response.json();
      setter(data.length); 
    } catch (error) {
      console.error(`Erro ao buscar contagem para ${endpoint}:`, error);
      setter(0); 
    }
  };

  useEffect(() => {
    fetchCount('alunos', setTotalAlunos);
    fetchCount('professores', setTotalProfessores);
    fetchCount('disciplinas', setTotalDisciplinas);
    fetchCount('turmas', setTotalTurmas);
  }, []);

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