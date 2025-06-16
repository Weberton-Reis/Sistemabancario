const mongoose = require('mongoose');

const contaSchema = new mongoose.Schema({
  // Informações textuais
  numeroConta: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nomeCliente: {
    type: String,
    required: true,
    trim: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  telefone: {
    type: String,
    required: true,
    trim: true
  },
  endereco: {
    type: String,
    required: true,
    trim: true
  },
  tipoConta: {
    type: String,
    required: true,
    enum: ['corrente', 'poupanca', 'salario'],
    default: 'corrente'
  },
  saldo: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['ativa', 'inativa', 'bloqueada'],
    default: 'ativa'
  },
  // Informações gráficas (URLs de imagens)
  fotoCliente: {
    type: String,
    default: 'https://via.placeholder.com/150x150?text=Foto+Cliente'
  },
  assinaturaDigital: {
    type: String,
    default: 'https://via.placeholder.com/300x100?text=Assinatura+Digital'
  },
  documentoIdentidade: {
    type: String,
    default: 'https://via.placeholder.com/400x250?text=Documento+Identidade'
  }
}, {
  timestamps: true
});

// Middleware para gerar número da conta automaticamente
contaSchema.pre('save', async function(next) {
  if (!this.numeroConta) {
    const count = await mongoose.model('Conta').countDocuments();
    this.numeroConta = String(100000 + count + 1).padStart(8, '0');
  }
  next();
});

module.exports = mongoose.model('Conta', contaSchema);

