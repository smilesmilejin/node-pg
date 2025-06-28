// example.js
const { pool } = require('./db');

console.log('####### getUsers')
const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log(result.rows); // array of rows
  } catch (err) {
    console.error('Query error:', err);
  }
};

getUsers();

console.log('####### insertUsers')

// // Defines an asynchronous function named insertUser that takes two parameters: name and email.
// // Being async means you can use await inside it to wait for promises (like database queries) to resolve.
// async function insertUser(name, email) {
//   try {
//     const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'; // $1 and $2 are placeholders for parameters — helps avoid SQL injection.
//     const values = [name, email]; // values is an array holding the actual values that replace $1 and $2 in the query (the function inputs).

//     const res = await pool.query(text, values);
//     console.log('Inserted user:', res.rows[0]); // The result (res) contains information about the query, including inserted rows.
//     return res.rows[0];
//   } catch (err) {
//     console.error('Insert query error:', err);
//     throw err;
//   }
// }

// insertUser('Alice', 'alice@example.com')
//   .then(user => console.log('User inserted:', user))
//   .catch(console.error);


// Defines an asynchronous function named insertUser that takes two parameters: name and email.
// Being async means you can use await inside it to wait for promises (like database queries) to resolve.
// Because of RETURNING *, the query returns the newly inserted row.
async function insertUser(name) {
  try {
    const text = 'INSERT INTO users(name) VALUES($1) RETURNING *'; // $1 and $2 are placeholders for parameters — helps avoid SQL injection.
    const values = [name]; // values is an array holding the actual values that replace $1 and $2 in the query (the function inputs).

    const res = await pool.query(text, values);
    console.log('res----:', res);

    console.log('Inserted user:', res.rows[0]); // The result (res) contains information about the query, including inserted rows.
    
    return res.rows[0];
  } catch (err) {
    console.error('Insert query error:', err);
    throw err;
  }
}

insertUser('Alice')
  .then(user => console.log('User inserted:', user))
  .catch(console.error);

// ####### insertUsers
// []
// res----: Result {
//   command: 'INSERT',
//   rowCount: 1,
//   oid: 0,
//   rows: [ { id: 1, name: 'Alice', createdAt: 2025-06-28T03:11:30.003Z } ],
//   fields: [
//     Field {
//       name: 'id',
//       tableID: 361681,
//       columnID: 1,
//       dataTypeID: 23,
//       dataTypeSize: 4,
//       dataTypeModifier: -1,
//       format: 'text'
//     },
//     Field {
//       name: 'name',
//       tableID: 361681,
//       columnID: 2,
//       dataTypeID: 1043,
//       dataTypeSize: -1,
//       dataTypeModifier: 1004,
//       format: 'text'
//     },
//     Field {
//       name: 'createdAt',
//       tableID: 361681,
//       columnID: 3,
//       dataTypeID: 1114,
//       dataTypeSize: 8,
//       dataTypeModifier: -1,
//       format: 'text'
//     }
//   ],
//   _parsers: [
//     [Function: parseInteger],
//     [Function: noParse],
//     [Function: parseDate]
//   ],
//   _types: TypeOverrides {
//     _types: {
//       getTypeParser: [Function: getTypeParser],
//       setTypeParser: [Function: setTypeParser],
//       arrayParser: [Object],
//       builtins: [Object]
//     },
//     text: {},
//     binary: {}
//   },
//   RowCtor: null,
//   rowAsArray: false,
//   _prebuiltEmptyResultObject: { id: null, name: null, createdAt: null }
// }
// Inserted user: { id: 1, name: 'Alice', createdAt: 2025-06-28T03:11:30.003Z }
// User inserted: { id: 1, name: 'Alice', createdAt: 2025-06-28T03:11:30.003Z }
// MacBook-Pro-7:node-pg xinshuangjin$ 