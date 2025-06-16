// --- AJUSTE FEITO: Código corrigido para ser o ponto de entrada da aplicação ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Mantenha para estilos base/reset

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);