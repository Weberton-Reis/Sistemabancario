const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Para desenvolvimento, vamos usar um banco em memória simulado
    console.log('Usando banco de dados simulado para desenvolvimento');
    console.log('MongoDB simulado conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

