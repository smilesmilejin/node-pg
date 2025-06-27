import pg from 'pg'
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

export { pool, client };