function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Ocurrió un error interno en el servidor.',
    ...(err.details ? { errors: err.details } : {}),
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `La ruta ${req.method} ${req.originalUrl} no existe.`,
  });
}

module.exports = { errorHandler, notFoundHandler };