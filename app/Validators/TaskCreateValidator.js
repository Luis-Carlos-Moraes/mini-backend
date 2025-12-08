// app/Validators/TaskCreateValidator.js
const HttpError = require('../Utils/HttpError');

class TaskCreateValidator {
  static validate(req) {
    const { titulo, descricao } = req.body || {};

    if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
      throw new HttpError(400, 'Campo "titulo" é obrigatório');
    }

    if (descricao !== undefined && typeof descricao !== 'string') {
      throw new HttpError(400, 'Campo "descricao" deve ser uma string');
    }
  }
}

module.exports = TaskCreateValidator;
