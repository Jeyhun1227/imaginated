const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_URL,
  database: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

module.exports = pool;