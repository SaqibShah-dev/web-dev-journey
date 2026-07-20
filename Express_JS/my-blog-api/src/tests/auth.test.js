const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../src/app');

// Note: this hits `app` directly in-memory — no real port is opened,
// which is exactly why app.js and server.js are split (see app.js).

test('GET /health returns ok', async () => {
  const res = await request(app).get('/health');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, 'ok');
});

test('POST /auth/register rejects invalid email', async () => {
  const res = await request(app)
    .post('/auth/register')
    .send({ email: 'not-an-email', password: 'password123' });

  assert.strictEqual(res.status, 400);
});

// Requires a real DATABASE_URL + migrated DB to actually pass —
// this is here to show the pattern, run it once your DB is set up.
test.skip('POST /auth/register creates a user', async () => {
  const res = await request(app)
    .post('/auth/register')
    .send({ email: `test-${Date.now()}@example.com`, password: 'password123' });

  assert.strictEqual(res.status, 201);
  assert.ok(res.body.data.token);
});
