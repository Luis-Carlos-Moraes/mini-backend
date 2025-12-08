// app/Mails/TaskMail.js
class TaskMail {
  static async sendTaskCompleted(user, task) {
    // Simulação de envio de e-mail.
    console.log(
      `[TaskMail] Enviando e-mail para ${user.email} informando conclusão da tarefa "${task.titulo}"`,
    );
  }
}

module.exports = TaskMail;
