// app/Controllers/TaskController.js
const TaskService = require('../Services/TaskService');
const TaskCreateValidator = require('../Validators/TaskCreateValidator');
const TaskCompleteValidator = require('../Validators/TaskCompleteValidator');
const ApiResponse = require('../Utils/ApiResponse');

class TaskController {
  static list(req, res, next) {
    try {
      const tasks = TaskService.listByUser(req.user.id);
      return ApiResponse.success(res, tasks);
    } catch (err) {
      return next(err);
    }
  }

  static create(req, res, next) {
    try {
      TaskCreateValidator.validate(req);

      const task = TaskService.create({
        userId: req.user.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
      });

      return ApiResponse.success(res, task, 201);
    } catch (err) {
      return next(err);
    }
  }

  static async complete(req, res, next) {
    try {
      // TODO (candidato):
      // 1. Validar a requisição com TaskCompleteValidator.validate(req)
      // 2. Obter taskId (req.params.id), notify (req.body.notify) e user (req.user)
      // 3. Chamar TaskService.complete({ taskId, user, notify })
      // 4. Retornar a resposta de sucesso com a tarefa atualizada
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = TaskController;
