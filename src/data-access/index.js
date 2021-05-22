const { Pool } = require('pg')
const { database } = require('../config/index');

const pool = new Pool({
  host: database.url,
  database: database.name,
  user: database.user,
  password: database.password,
})

module.exports = {
  getClient: () => pool.connect(),
  query: (text, params) => pool.query(text, params)
};