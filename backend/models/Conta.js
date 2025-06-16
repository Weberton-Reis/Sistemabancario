const mongoose = require('mongoose');

const contaSchema = new mongoose.Schema({
  // Informações textuais
  numeroConta: {
    type: String,
    unique: true,
    trim: true
  },
  nomeCliente: {
    type: String,
    required: [true, 'O nome do cliente é obrigatório.'],
    trim: true
  },
  cpf: {
    type: String,
    required: [true, 'O CPF é obrigatório.'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, insira um email válido.']
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório.'],
    trim: true
  },
  endereco: {
    type: String,
    required: [true, 'O endereço é obrigatório.'],
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
    min: [0, 'O saldo não pode ser negativo.']
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
  timestamps: true // Cria os campos createdAt e updatedAt automaticamente
});

// Middleware para gerar número da conta automaticamente ANTES de salvar
contaSchema.pre('save', async function(next) {
  // Executa apenas se for um documento novo e o numeroConta não foi fornecido
  if (this.isNew && !this.numeroConta) {
    const ultimoDocumento = await mongoose.model('Conta', contaSchema).findOne().sort({ createdAt: -1 });
    let proximoNumero = 100001;
    if (ultimoDocumento && ultimoDocumento.numeroConta) {
        proximoNumero = parseInt(ultimoDocumento.numeroConta, 10) + 1;
    }
    this.numeroConta = String(proximoNumero).padStart(8, '0');
  }
  next();
});

module.exports = mongoose.model('Conta', contaSchema);