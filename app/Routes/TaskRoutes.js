// app/Routes/TaskRoutes.js
const express = require('express');
const TaskController = require('../Controllers/TaskController');
const AuthMiddleware = require('../Middleware/AuthMiddleware');

const router = express.Router();

// Todas as rotas de tasks exigem "autenticação"
router.use(AuthMiddleware);

// Já implementadas
router.get('/', TaskController.list);
router.post('/', TaskController.create);

// Funcionalidade do desafio (live code)
router.patch('/:id/complete', TaskController.complete);

module.exports = router;
