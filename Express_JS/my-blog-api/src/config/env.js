// Loads .env locally (in production, the host injects these directly)
try {
  process.loadEnvFile();
} catch {
  // No .env file found (e.g. in production) — that's fine, env vars
  // are expected to already be set by the hosting platform.
}

const required = ['DATABASE_URL', 'JWT_SECRET'];

for (const key of required) {
  if (!process.env[key]) {
    // Fail loudly and immediately, not three hours later mid-request.
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

module.exports = config;
