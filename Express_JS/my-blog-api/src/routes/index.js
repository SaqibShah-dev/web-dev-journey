const express = require('express');
const authRoutes = require('./auth.routes');
const postsRoutes = require('./posts.routes');

const router = express.Router();

// app.js only ever imports this one file — adding a new feature
// means adding one line here, not editing app.js.
router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
