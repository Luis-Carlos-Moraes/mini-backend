// app.js
const express = require('express');
const TaskRoutes = require('./app/Routes/TaskRoutes');
const errorHandler = require('./app/Utils/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Mini backend de tarefas está online',
  });
});

// Rotas de tarefas
app.use('/tasks', TaskRoutes);

// Middleware de tratamento de erros (sempre por último)
app.use(errorHandler);

module.exports = app;
