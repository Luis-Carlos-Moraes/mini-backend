// app/Jobs/TaskStatsJob.js
class TaskStatsJob {
  static registerCompletedTask(task) {
    // Em um sistema real, poderíamos persistir estatísticas ou enviar para uma fila.
    // Para o mini backend, apenas registramos um log.
    console.log(
      `[TaskStatsJob] Tarefa concluída: id=${task.id}, titulo="${task.titulo}"`,
    );
  }
}

module.exports = TaskStatsJob;
