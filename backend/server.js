require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Conectar ao banco de dados
// --- AJUSTE FEITO: Agora a conexão é real e acontece aqui ---
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Em produção, restrinja para o domínio do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/contas', require('./routes/contas'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API do Sistema Bancário está funcionando!',
    version: '1.0.0',
    endpoints: {
      contas: '/api/contas'
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando no ambiente '${process.env.NODE_ENV}' na porta ${PORT}`);
});