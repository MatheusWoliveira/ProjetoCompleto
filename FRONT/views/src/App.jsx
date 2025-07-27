// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import PaginaLogado from './pages/logado/PaginaLogado.jsx';
import Cadastro from './pages/cadastro/Cadastro.jsx';
import Perfil from './pages/perfil/Perfil.jsx';
import Musicas from './pages/musicas/Musicas.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logado/pgLogado" element={<PaginaLogado />} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/musicas" element={<Musicas />} />

        {/* outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
