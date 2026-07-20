const asyncHandler = require('../utils/asyncHandler');
const postsService = require('../services/posts.service');

const list = asyncHandler(async (req, res) => {
  const posts = await postsService.list();
  res.status(200).json({ data: posts });
});

const getById = asyncHandler(async (req, res) => {
  const post = await postsService.getById(req.params.id);
  res.status(200).json({ data: post });
});

const create = asyncHandler(async (req, res) => {
  // req.user is set by auth.middleware.js earlier in the chain
  const post = await postsService.create(req.user.id, req.body);
  res.status(201).json({ data: post });
});

const update = asyncHandler(async (req, res) => {
  const post = await postsService.update(req.params.id, req.user.id, req.body);
  res.status(200).json({ data: post });
});

const remove = asyncHandler(async (req, res) => {
  await postsService.remove(req.params.id, req.user.id);
  res.status(204).send();
});

module.exports = { list, getById, create, update, remove };
