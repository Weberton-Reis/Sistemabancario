const express = require('express');
const router = express.Router();
const {
  listarContas,
  buscarContaPorId,
  criarConta,
  atualizarConta,
  excluirConta
} = require('../controllers/contaController');

// Rotas CRUD para contas
router.route('/')
  .get(listarContas)
  .post(criarConta);

router.route('/:id')
  .get(buscarContaPorId)
  .put(atualizarConta)
  .delete(excluirConta);

module.exports = router;