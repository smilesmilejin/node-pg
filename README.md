# Express Application Generator

This guide walks you through creating an Express app using the official Express application generator.

For more information, visit the official Express Generator documentation:  
[Express Application Generator Documentation](https://expressjs.com/en/starter/generator.html)

## Steps to Set Up the Express App

1. **Create the App Folder**
   Run the following command to create a new Express app inside the `myapp` folder:

   ```bash
   $ npx express-generator node-pg

2. **Navigate to the App Folder**

   Change to the newly created app directory:
   ```bash
   $ cd node-pg
   ```
3. **Install Dependencies**

   ```bash
   $ npm install
   ```

4. **On MacOS or Linux, run the app with this command:**
   ```bash
   $ DEBUG=myapp:* npm start
   ```

   ```
   npm start
   ```
5. **It runs in the following:**
```
http://localhost:3000/
```
# Install pg
https://node-postgres.com
node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database.

**1. Run to Install pg**

```
$ npm install pg
```



**2. Create folder and file in root directory: config/db.js**
https://node-postgres.com/features/connecting
Connetion URI

Put the following to config/db.js
```js
import pg from 'pg'
const { Pool, Client } = pg
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
 
const pool = new Pool({
  connectionString,
})
 
await pool.query('SELECT NOW()')
await pool.end()
 
const client = new Client({
  connectionString,
})
 
await client.connect()
 
await client.query('SELECT NOW()')
 
await client.end()
```

**3. Create folder and file in root directory: config/test-db.js**
Run the following to test database connection:
```
$ node config/test-db.js
```


4. **Update package.json for ESM if needed**
```
{
  "type": "module"
}
```
Default to pool.query() everywhere
Only use client when doing transactions or advanced connection management

Run the following to test database query:
```
$ node config/test-query.js
```

# Install Migration Tools  - node-pg-migrate
[node-pg-migrate](https://github.com/salsita/node-pg-migrate/blob/main/README.md)

https://github.com/salsita/node-pg-migrate/blob/main/README.md

Doc:
https://salsita.github.io/node-pg-migrate/

1. **Check if pg is installed**

1.Check your package.json
    Look inside the dependencies section. If you see "pg": "..." listed, it's installed.

    Example snippet:
    ```
    "dependencies": {
    "pg": "^8.16.3",
    // other packages...
    }
    ``
2. Use npm/yarn to check
    Run this command in your project root terminal:
    ```
    npm list pg
    ```
    MacBook-Pro-7:node-pg xinshuangjin$ npm list pg
    node-pg@0.0.0 /Users/xinshuangjin/Developer/capstone/node-pg
    └─┬ pg@8.16.3
    └─┬ pg-pool@3.10.1
        └── pg@8.16.3 deduped

2. **Installation**
```
npm add --save-dev node-pg-migrate
```


3. **Add to package.json**

Add "migrate": "node-pg-migrate" to scripts section of your package.json so you are able to quickly run commands.
```
  "scripts": {
    "start": "node ./bin/www",
    "migrate": "node-pg-migrate"
  },
```

Run
```
npm run migrate create my-first-migration
```

It will create file xxx_my-first-migration.js in migrations folder.


Open it and change contents to:
```js
export const up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createTable('posts', {
    id: 'id',
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    body: { type: 'text', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('posts', 'userId');
};
```


Now you should put your DB connection string to DATABASE_URL environment variable and run npm run migrate up.  
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/node_pg npm run migrate up
```

# Create PostgresSQL database locally to confirm two those two tables
You should now have two tables in your DB: ```posts``` and ```users```
```bash
$ psql -U postgres
\c node_pg;
\dt
```


If you want to change your schema later, you can e.g. add lead paragraph to posts:

Run npm run migrate create posts_lead, edit ```xxx_posts_lead.js```:
```
npm run migrate create posts_lead
```

export const up = (pgm) => {
  pgm.addColumns('posts', {
    lead: { type: 'text', notNull: true },
  });
};
Run npm run migrate up and there will be a new column in posts table 🎉


```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/node_pg npm run migrate up
```



# Create PostgresSQL database locally to confirm posts has one more column 'lead'
```bash
$ psql -U postgres
\c node_pg;
\dt
SELECT * FROM posts;
```


# Remove the following from ```package.json``` otherwise cannot use npm start to run
```
"type": "module"
``` 

If you're not using "type": "module" in your package.json, Node.js treats your files as CommonJS modules. 
That means you must use require and module.exports, not import/export.

So this line in db.js ❌ will not work in CommonJS.:
```
export { pool, client };
```

Solution:

stick with CommonJS style (using require, module.exports) and have your app run smoothly with npm start.

**1. Make sure your package.json does NOT have "type": "module"**

**2. Use CommonJS syntax everywhere**

In your db.js (or db.mjs, but better rename to .js), write:
// db.js
```js
const pg = require('pg');
const { Pool, Client } = pg;

const connectionString = 'postgres://postgres:postgres@localhost:5432/node_pg';

const pool = new Pool({ connectionString });
const client = new Client({ connectionString });

module.exports = { pool, client };
```


**3. In your test-db.js or other files, use:**

In CommonJS files (which you have because you are using require() and no "type": "module"), you cannot use await outside an async function.

```js
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
```

## Try Insert pg query in example-query.js

```js
const { pool } = require('./db');
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
```

console log result:
```
####### getUsers
####### insertUsers
[]
res----: Result {
  command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [ { id: 1, name: 'Alice', createdAt: 2025-06-28T03:11:30.003Z } ],
  fields: [
    Field {
      name: 'id',
      tableID: 361681,
      columnID: 1,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    },
    Field {
      name: 'name',
      tableID: 361681,
      columnID: 2,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 1004,
      format: 'text'
    },
    Field {
      name: 'createdAt',
      tableID: 361681,
      columnID: 3,
      dataTypeID: 1114,
      dataTypeSize: 8,
      dataTypeModifier: -1,
      format: 'text'
    }
  ],
  _parsers: [
    [Function: parseInteger],
    [Function: noParse],
    [Function: parseDate]
  ],
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false,
  _prebuiltEmptyResultObject: { id: null, name: null, createdAt: null }
}
Inserted user: { id: 1, name: 'Alice', createdAt: 2025-06-28T03:11:30.003Z }
User inserted: { id: 1, name: 'Alice', createdAt: 2025-06-28T03:11:30.003Z }
MacBook-Pro-7:node-pg xinshuangjin$ 
```