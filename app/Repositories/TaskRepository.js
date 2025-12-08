// app/Repositories/TaskRepository.js
const Task = require('../Models/Task');
const TaskStatusEnum = require('../Enums/TaskStatusEnum');

let nextId = 1;
const tasks = [];

class TaskRepository {
  static create({ titulo, descricao = '', status = TaskStatusEnum.PENDENTE, userId }) {
    const task = new Task({
      id: nextId++,
      titulo,
      descricao,
      status,
      userId,
    });

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

  // Apenas para debug/manual se quiser
  static _all() {
    return tasks;
  }
}

module.exports = TaskRepository;
