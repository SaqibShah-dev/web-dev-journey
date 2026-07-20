const AppError = require('../utils/AppError');

// Mounted after all routes in app.js — if a request reaches here,
// nothing matched, so we forward a clean 404 to errorHandler.js.
function notFound(req, res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

module.exports = notFound;
