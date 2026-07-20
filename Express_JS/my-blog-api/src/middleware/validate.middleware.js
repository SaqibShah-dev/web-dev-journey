const AppError = require('../utils/AppError');

// A factory, not a middleware itself: pass it a zod schema, it
// returns middleware that validates req.body against that schema
// and rejects with 400 *before* the request reaches the controller.
//
// Usage: router.post('/posts', validate(createPostSchema), postsController.create)
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      return next(new AppError(`Validation failed: ${message}`, 400));
    }

    // Overwrite req.body with the parsed data (zod can coerce/trim types)
    req.body = result.data;
    next();
  };
}

module.exports = validate;
