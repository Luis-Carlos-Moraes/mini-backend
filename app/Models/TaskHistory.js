// app/Models/TaskHistory.js
let nextHistoryId = 1;
const histories = [];

class TaskHistory {
  constructor({ taskId, tipo, descricao }) {
    this.id = nextHistoryId++;
    this.taskId = taskId;
    this.tipo = tipo;
    this.descricao = descricao || '';
    this.createdAt = new Date();
  }

  static create(data) {
    const history = new TaskHistory(data);
    histories.push(history);
    return history;
  }

  static findByTask(taskId) {
    return histories.filter((h) => h.taskId === Number(taskId));
  }
}

module.exports = TaskHistory;
