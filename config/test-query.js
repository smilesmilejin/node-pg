// import { pool} from './db.js';

// async function getUsers() {
//   try {
//     const res = await pool.query('SELECT * FROM users');
//     return res.rows;
//   } catch (err) {
//     console.error('Error querying users:', err);
//     throw err;
//   }
// }

// getUsers().then(users => console.log(users));

// But if you want to use CommonJS (no "type": "module"), you need to rewrite like this:
const { pool } = require('./db');

async function getUsers() {
  try {
    const res = await pool.query('SELECT * FROM users');
    return res.rows; // [ { id: 1, name: 'Alice', createdAt: 2025-06-28T03:11:30.003Z } ]
  } catch (err) {
    console.error('Error querying users:', err);
    throw err;
  }
}

getUsers().then(users => console.log(users));