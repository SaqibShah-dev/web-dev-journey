// Express does not automatically catch errors thrown inside async
// route handlers. Without this wrapper, a rejected promise in an
// async controller silently hangs the request instead of reaching
// errorHandler.js. Wrapping every async handler fixes that.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
