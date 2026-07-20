const express = require('express');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Parses incoming JSON bodies into req.body
app.use(express.json());

// Basic request logger — swap for a real logger (pino/winston) later
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/', routes);

// Order matters: notFound catches unmatched routes,
// errorHandler must be registered LAST to catch everything above it.
app.use(notFound);
app.use(errorHandler);

// Deliberately does NOT call app.listen() here — that's server.js's
// job. This lets tests import `app` and hit it in-memory (Supertest)
// without opening a real network port.
module.exports = app;
