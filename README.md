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


