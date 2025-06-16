const Conta = require('../models/ContaSimulada');

// GET - Listar todas as contas
const listarContas = async (req, res) => {
  try {
    const contas = await Conta.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contas.length,
      data: contas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar contas',
      error: error.message
    });
  }
};

// GET - Buscar conta por ID
const buscarContaPorId = async (req, res) => {
  try {
    const conta = await Conta.findById(req.params.id);
    
    if (!conta) {
      return res.status(404).json({
        success: false,
        message: 'Conta não encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: conta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar conta',
      error: error.message
    });
  }
};

// POST - Criar nova conta
const criarConta = async (req, res) => {
  try {
    const conta = await Conta.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Conta criada com sucesso',
      data: conta
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} já existe no sistema`
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Erro ao criar conta',
      error: error.message
    });
  }
};

// PUT - Atualizar conta
const atualizarConta = async (req, res) => {
  try {
    const conta = await Conta.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!conta) {
      return res.status(404).json({
        success: false,
        message: 'Conta não encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Conta atualizada com sucesso',
      data: conta
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} já existe no sistema`
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Erro ao atualizar conta',
      error: error.message
    });
  }
};

// DELETE - Excluir conta
const excluirConta = async (req, res) => {
  try {
    const conta = await Conta.findByIdAndDelete(req.params.id);

    if (!conta) {
      return res.status(404).json({
        success: false,
        message: 'Conta não encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Conta excluída com sucesso',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao excluir conta',
      error: error.message
    });
  }
};

module.exports = {
  listarContas,
  buscarContaPorId,
  criarConta,
  atualizarConta,
  excluirConta
};

