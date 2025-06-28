// // import pg from 'pg';
// // const { Pool, Client } = pg;

// // const connectionString = 'postgres://postgres:postgres@localhost:5432/node_pg';

// // // Pool test
// // const pool = new Pool({ connectionString });

// // const { pool, client } = require('./db');
// import { pool, client } from './db.js';

// try {
//   const res = await pool.query('SELECT NOW()');
//   console.log('✅ Pool connected:', res.rows[0].now);
// } catch (err) {
//   console.error('❌ Pool error:', err.message);
// } finally {
//   await pool.end();
// }

// // // Client test
// // const client = new Client({ connectionString });

// try {
//   await client.connect();
//   const res = await client.query('SELECT NOW()');
//   console.log('✅ Client connected:', res.rows[0].now);
// } catch (err) {
//   console.error('❌ Client error:', err.message);
// } finally {
//   await client.end();
// }

// Use CommonJS syntax everywhere
const { pool, client } = require('./db');

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Pool connected:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Pool error:', err.message);
  } finally {
    await pool.end();
  }

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('✅ Client connected:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Client error:', err.message);
  } finally {
    await client.end();
  }
}

test().catch(console.error);
