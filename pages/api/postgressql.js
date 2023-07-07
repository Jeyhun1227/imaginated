const Pool = require('pg').Pool
const { environment } = process.env;

const pool = new Pool({
  user: 'postgres',
  host: process.env[`POSTGRES_URL_${environment}`],
  database: 'postgres',
  password: process.env[`POSTGRES_PASSWORD_${environment}`],
  port: 5432,
})

module.exports = pool;