const prisma = require('../config/db');
const AppError = require('../utils/AppError');

async function list() {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { id: true, email: true } } },
  });
}

async function getById(id) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, email: true } } },
  });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  return post;
}

async function create(userId, data) {
  return prisma.post.create({
    data: { ...data, userId },
  });
}

async function update(postId, userId, data) {
  const post = await getById(postId); // throws 404 if missing

  if (post.userId !== userId) {
    throw new AppError('You do not have permission to edit this post', 403);
  }

  return prisma.post.update({
    where: { id: postId },
    data,
  });
}

async function remove(postId, userId) {
  const post = await getById(postId); // throws 404 if missing

  // This is the "only the owner can delete" rule from the milestone
  // project requirement — enforced in the service, not the controller.
  if (post.userId !== userId) {
    throw new AppError('You do not have permission to delete this post', 403);
  }

  await prisma.post.delete({ where: { id: postId } });
}

module.exports = { list, getById, create, update, remove };
