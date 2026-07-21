const express = require('express');
const postsController = require('../controllers/posts.controller');
const requireAuth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createPostSchema, updatePostSchema } = require('../validators/post.validator');

const router = express.Router();

// Public — anyone can read posts
router.get('/', postsController.list);
router.get('/:id', postsController.getById);

// Protected — requireAuth runs first, sets req.user, then validate,
// then the controller. Order matters: check identity before shape.
router.post('/', requireAuth, validate(createPostSchema), postsController.create);
router.put('/:id', requireAuth, validate(updatePostSchema), postsController.update);
router.delete('/:id', requireAuth, postsController.remove);

module.exports = router;
