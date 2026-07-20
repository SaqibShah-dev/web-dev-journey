const { z } = require('zod');

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  body: z.string().min(1, 'Body is required'),
});

// All fields optional for updates (PATCH-style partial update)
const updatePostSchema = createPostSchema.partial();

module.exports = { createPostSchema, updatePostSchema };
