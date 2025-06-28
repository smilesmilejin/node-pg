// import pg from 'pg'
const pg = require('pg');
const { Pool, Client } = pg
const connectionString = 'postgres://postgres:postgres@localhost:5432/node_pg'
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
 
const pool = new Pool({
  connectionString,
})
 
// await pool.query('SELECT NOW()')
// await pool.end()
 
const client = new Client({
  connectionString,
})
 
// await client.connect()
 
// await client.query('SELECT NOW()')
 
// await client.end()
module.exports = { pool, client };
// export { pool, client };

// If you're not using "type": "module" in your package.json, Node.js treats your files as CommonJS modules. 
// That means you must use require and module.exports, not import/export.

// So this line:
// export { pool, client };
// ❌ will not work in CommonJS. Here's how to fix it:
// export { pool, client };