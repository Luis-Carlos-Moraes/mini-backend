// app/Models/Task.js
class Task {
  constructor({ id, titulo, descricao = '', status, userId, createdAt, updatedAt }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

module.exports = Task;
