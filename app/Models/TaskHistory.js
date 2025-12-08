// app/Models/TaskHistory.js
class TaskHistory {
  constructor({ id, taskId, tipo, descricao = '', createdAt }) {
    this.id = id;
    this.taskId = taskId;
    this.tipo = tipo;
    this.descricao = descricao;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = TaskHistory;
