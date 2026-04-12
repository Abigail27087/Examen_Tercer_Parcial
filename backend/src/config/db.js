const { PrismaClient } = require('@prisma/client');


console.log("DATABASE_URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

module.exports = prisma;