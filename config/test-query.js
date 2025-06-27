import { pool} from './db.js';

async function getUsers() {
  try {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  } catch (err) {
    console.error('Error querying users:', err);
    throw err;
  }
}

getUsers().then(users => console.log(users));