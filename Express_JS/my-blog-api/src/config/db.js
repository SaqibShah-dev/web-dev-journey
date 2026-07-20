const { PrismaClient } = require('@prisma/client');

// One instance shared across the whole app — avoids opening a new
// connection pool every time a file needs the database.
const prisma = new PrismaClient();

module.exports = prisma;
