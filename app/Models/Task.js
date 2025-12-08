// app/Models/Task.js
const TaskStatusEnum = require('../Enums/TaskStatusEnum');

let nextId = 1;
const tasks = [];

class Task {
  constructor({ titulo, descricao = '', status = TaskStatusEnum.PENDENTE, userId }) {
    this.id = nextId++;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.userId = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(data) {
    const task = new Task(data);
    tasks.push(task);
    return task;
  }

  static findAllByUser(userId) {
    return tasks.filter((t) => t.userId === userId);
  }

  static findById(id) {
    return tasks.find((t) => t.id === Number(id)) || null;
  }

  static save(task) {
    task.updatedAt = new Date();
    return task;
  }

  // Apenas para debug/manual
  static _all() {
    return tasks;
  }
}

module.exports = Task;
