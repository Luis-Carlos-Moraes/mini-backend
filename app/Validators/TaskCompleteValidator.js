// app/Validators/TaskCompleteValidator.js
const HttpError = require('../Utils/HttpError');

class TaskCompleteValidator {
  static validate(req) {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      throw new HttpError(400, 'Parâmetro "id" inválido');
    }

    const { notify } = req.body || {};

    // TODO (candidato):
    // Validar o campo "notify":
    // - Se notify === undefined -> ok.
    // - Se notify !== undefined e typeof notify !== 'boolean'
    //   -> lançar HttpError(400, 'Campo "notify" deve ser booleano').
  }
}

module.exports = TaskCompleteValidator;
