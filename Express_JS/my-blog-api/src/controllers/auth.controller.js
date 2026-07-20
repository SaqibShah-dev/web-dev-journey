const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');

// Every handler is just: read req, call service, shape res.
// No business logic lives here — see auth.service.js for that.

const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  res.status(201).json({ data: { user, token } });
});

const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  res.status(200).json({ data: { user, token } });
});

module.exports = { register, login };
