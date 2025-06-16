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
router.get('/', listarContas);           // GET /api/contas
router.get('/:id', buscarContaPorId);    // GET /api/contas/:id
router.post('/', criarConta);            // POST /api/contas
router.put('/:id', atualizarConta);      // PUT /api/contas/:id
router.delete('/:id', excluirConta);     // DELETE /api/contas/:id

module.exports = router;

