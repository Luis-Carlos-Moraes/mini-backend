// app/Utils/errorHandler.js
const HttpError = require('./HttpError');

function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
  });
}

module.exports = errorHandler;
