// --- AJUSTE FEITO: Código corrigido para ser o componente raiz com as rotas ---
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaContas from './pages/ListaContas';
import NovaConta from './pages/NovaConta';
import EditarConta from './pages/EditarConta';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <main>
          <Routes>
            <Route path="/" element={<ListaContas />} />
            <Route path="/nova" element={<NovaConta />} />
            <Route path="/editar/:id" element={<EditarConta />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;