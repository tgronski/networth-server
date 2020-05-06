require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? 'postgresql://networth:tessg@localhost/networth'
    : process.env.DATABASE_URL,

    "ssl": !!process.env.SSL,
  }