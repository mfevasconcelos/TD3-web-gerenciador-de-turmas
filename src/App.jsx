import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AlunosPage from './pages/AlunosPage';
import ProfessoresPage from './pages/ProfessoresPage';
import DisciplinasPage from './pages/DisciplinasPage';
import Turmaspage from './pages/TurmasPage';

function App() {
  return (
    <HashRouter>
      <div className="container">
        <nav>
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/alunos" className="nav-button">Alunos</Link>
          <Link to="/professores" className="nav-button">Professores</Link>
          <Link to="/disciplinas" className="nav-button">Disciplinas</Link>
          <Link to="/turmas" className="nav-button">Turmas</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alunos" element={<AlunosPage />} />
          <Route path="/professores" element={<ProfessoresPage />} />
          <Route path="/disciplinas" element={<DisciplinasPage />} />
          <Route path="/turmas" element={<Turmaspage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;