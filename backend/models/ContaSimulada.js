let contasDB = [
  {
    _id: '507f1f77bcf86cd799439011',
    numeroConta: '00100001',
    nomeCliente: 'João Silva Santos',
    cpf: '12345678901',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-1234',
    endereco: 'Rua das Flores, 123, Centro, São Paulo, SP, 01234-567',
    tipoConta: 'corrente',
    saldo: 2500.75,
    status: 'ativa',
    fotoCliente: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    assinaturaDigital: 'https://via.placeholder.com/300x100/4F46E5/FFFFFF?text=João+Silva+Santos',
    documentoIdentidade: 'https://via.placeholder.com/400x250/6366F1/FFFFFF?text=RG+12.345.678-9',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-20T14:45:00Z')
  },
  {
    _id: '507f1f77bcf86cd799439012',
    numeroConta: '00100002',
    nomeCliente: 'Maria Oliveira Costa',
    cpf: '98765432109',
    email: 'maria.oliveira@email.com',
    telefone: '(11) 88888-5678',
    endereco: 'Avenida Paulista, 456, Bela Vista, São Paulo, SP, 01310-100',
    tipoConta: 'poupanca',
    saldo: 15000.00,
    status: 'ativa',
    fotoCliente: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    assinaturaDigital: 'https://via.placeholder.com/300x100/EC4899/FFFFFF?text=Maria+Oliveira+Costa',
    documentoIdentidade: 'https://via.placeholder.com/400x250/F472B6/FFFFFF?text=RG+98.765.432-1',
    createdAt: new Date('2024-02-10T09:15:00Z'),
    updatedAt: new Date('2024-02-15T16:20:00Z')
  },
  {
    _id: '507f1f77bcf86cd799439013',
    numeroConta: '00100003',
    nomeCliente: 'Carlos Eduardo Ferreira',
    cpf: '11122233344',
    email: 'carlos.ferreira@email.com',
    telefone: '(11) 77777-9012',
    endereco: 'Rua Augusta, 789, Consolação, São Paulo, SP, 01305-000',
    tipoConta: 'salario',
    saldo: 3200.50,
    status: 'ativa',
    fotoCliente: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    assinaturaDigital: 'https://via.placeholder.com/300x100/10B981/FFFFFF?text=Carlos+E.+Ferreira',
    documentoIdentidade: 'https://via.placeholder.com/400x250/34D399/FFFFFF?text=RG+11.122.233-4',
    createdAt: new Date('2024-03-05T11:00:00Z'),
    updatedAt: new Date('2024-03-10T13:30:00Z')
  }
];

let nextId = 4;

// Simulação das operações do Mongoose
const ContaSimulada = {
  find: () => ({
    sort: () => Promise.resolve(contasDB)
  }),

  findById: (id) => {
    const conta = contasDB.find(c => c._id === id);
    return Promise.resolve(conta || null);
  },

  create: (dados) => {
    const novaConta = {
      _id: `507f1f77bcf86cd79943901${nextId}`,
      numeroConta: String(100000 + nextId).padStart(8, '0'),
      ...dados,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    nextId++;
    contasDB.push(novaConta);
    return Promise.resolve(novaConta);
  },

  findByIdAndUpdate: (id, dados, options) => {
    const index = contasDB.findIndex(c => c._id === id);
    if (index === -1) return Promise.resolve(null);

    contasDB[index] = {
      ...contasDB[index],
      ...dados,
      updatedAt: new Date()
    };
    return Promise.resolve(contasDB[index]);
  },

  findByIdAndDelete: (id) => {
    const index = contasDB.findIndex(c => c._id === id);
    if (index === -1) return Promise.resolve(null);

    const contaRemovida = contasDB[index];
    contasDB.splice(index, 1);
    return Promise.resolve(contaRemovida);
  },

  countDocuments: () => Promise.resolve(contasDB.length)
};

module.exports = ContaSimulada;