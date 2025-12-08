// app/Repositories/TaskHistoryRepository.js
const TaskHistory = require('../Models/TaskHistory');

let nextHistoryId = 1;
const histories = [];

class TaskHistoryRepository {
  static create({ taskId, tipo, descricao }) {
    const history = new TaskHistory({
      id: nextHistoryId++,
      taskId,
      tipo,
      descricao,
    });

    histories.push(history);
    return history;
  }

  static findByTask(taskId) {
    return histories.filter((h) => h.taskId === Number(taskId));
  }

  // Apenas para debug/manual se quiser
  static _all() {
    return histories;
  }
}

module.exports = TaskHistoryRepository;
