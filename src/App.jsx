import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AlunosPage from './pages/AlunosPage';
import ProfessoresPage from './pages/ProfessoresPage';
import DisciplinasPage from './pages/DisciplinasPage';
import Turmaspage from './pages/TurmasPage';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav>
          <Link to="TD2-web-gerenciador-de-turmas/" className="nav-button">Home</Link>
          <Link to="TD2-web-gerenciador-de-turmas/alunos" className="nav-button">Alunos</Link>
          <Link to="TD2-web-gerenciador-de-turmas/professores" className="nav-button">Professores</Link>
          <Link to="TD2-web-gerenciador-de-turmas/disciplinas" className="nav-button">Disciplinas</Link>
          <Link to="TD2-web-gerenciador-de-turmas/turmas" className="nav-button">Turmas</Link>
        </nav>

        <Routes>
          <Route path="TD2-web-gerenciador-de-turmas/" element={<HomePage />} />
          <Route path="TD2-web-gerenciador-de-turmas/alunos" element={<AlunosPage />} />
          <Route path="TD2-web-gerenciador-de-turmas/professores" element={<ProfessoresPage />} />
          <Route path="TD2-web-gerenciador-de-turmas/disciplinas" element={<DisciplinasPage />} />
          <Route path="TD2-web-gerenciador-de-turmas/turmas" element={<Turmaspage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
