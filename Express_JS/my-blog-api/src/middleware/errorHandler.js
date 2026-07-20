// Error middleware is identified by Express purely because it takes
// 4 arguments (err, req, res, next) — that signature is required
// even though `next` is unused here.
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Operational errors (AppError) are safe to show to the client.
  // Anything else is an unexpected bug — log it, but don't leak
  // internal details (stack traces, DB errors) to the response.
  if (!err.isOperational) {
    console.error('UNEXPECTED ERROR:', err);
  }

  res.status(statusCode).json({
    error: {
      message: err.isOperational ? err.message : 'Something went wrong',
    },
  });
}

module.exports = errorHandler;
