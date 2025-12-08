// app/Services/TaskService.js
const TaskRepository = require('../Repositories/TaskRepository');
const TaskHistoryRepository = require('../Repositories/TaskHistoryRepository');
const TaskStatusEnum = require('../Enums/TaskStatusEnum');
const TaskHistoryTypeEnum = require('../Enums/TaskHistoryTypeEnum');
const HttpError = require('../Utils/HttpError');
const TaskMail = require('../Mails/TaskMail');
const TaskStatsJob = require('../Jobs/TaskStatsJob');

class TaskService {
  static listByUser(userId) {
    return TaskRepository.findAllByUser(userId);
  }

  static create({ userId, titulo, descricao }) {
    const task = TaskRepository.create({
      userId,
      titulo,
      descricao,
      status: TaskStatusEnum.PENDENTE,
    });

    TaskHistoryRepository.create({
      taskId: task.id,
      tipo: TaskHistoryTypeEnum.CRIACAO,
      descricao: 'Tarefa criada',
    });

    return task;
  }

  static async complete({ taskId, user, notify }) {
    // TODO (candidato): implementar as regras de negócio da conclusão de tarefa.
    //
    // Regras esperadas:
    //
    // 1. Buscar a tarefa pelo ID usando o repositório:
    //      const task = TaskRepository.findById(taskId);
    //    - Se não existir, lançar HttpError(404, 'Tarefa não encontrada').
    //
    // 2. Verificar se a tarefa pertence ao usuário (task.userId === user.id).
    //    - Se não pertencer, lançar HttpError(403, 'Você não tem permissão para concluir esta tarefa').
    //
    // 3. Verificar o status atual:
    //    - Se status === TaskStatusEnum.CANCELADA
    //         -> HttpError(400, 'Não é possível concluir uma tarefa cancelada').
    //    - Se status === TaskStatusEnum.CONCLUIDA
    //         -> HttpError(400, 'Tarefa já está concluída').
    //
    // 4. Atualizar o status para TaskStatusEnum.CONCLUIDA e salvar a tarefa:
    //      task.status = TaskStatusEnum.CONCLUIDA;
    //      TaskRepository.save(task);
    //
    // 5. Criar um registro de histórico usando TaskHistoryRepository.create
    //    com tipo TaskHistoryTypeEnum.CONCLUSAO.
    //
    // 6. Se notify === true:
    //      - chamar await TaskMail.sendTaskCompleted(user, task);
    //      - chamar TaskStatsJob.registerCompletedTask(task);
    //
    // 7. Retornar a tarefa atualizada.
  }
}

module.exports = TaskService;
