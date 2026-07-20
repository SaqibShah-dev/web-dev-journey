class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Marks this as an "expected" error we threw on purpose
    // (bad input, not found, forbidden) — as opposed to an
    // unexpected bug, which errorHandler.js treats differently.
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
