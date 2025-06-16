// arquivo: backend/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Para desenvolvimento, vamos usar um banco em memória simulado
    console.log('Usando banco de dados em memória (simulado)');
  } catch (error) {
    console.error('Erro na configuração do banco de dados simulado:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;