import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tokens from './pages/Tokens';
import Team from './pages/Team';
import Pecas from './pages/Pecas';
import Clientes from './pages/Clientes';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#F0F4F8]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/components" element={<Dashboard />} /> {/* Reusing dashboard for now as a list view */}
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/team" element={<Team />} />
            <Route path="/pecas" element={<Pecas />} />
            <Route path="/clientes" element={<Clientes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
