const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:todo-pass-123@todo-db-svc:5432/todo_db'
});

const initDb = async () => {
  let connected = false;
  while (!connected) {
    try {
      await client.connect();
      connected = true;
    } catch (e) {
      console.log('Waiting for DB...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  await client.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, todo TEXT)');
};
initDb();

app.get('/todos', async (req, res) => {
  const result = await client.query('SELECT todo FROM todos');
  res.json(result.rows.map(r => r.todo));
});

app.post('/todos', async (req, res) => {
  const text = req.body.todo;
  if (text && text.length <= 140) {
    await client.query('INSERT INTO todos (todo) VALUES ()', [text]);
    res.status(201).send('OK');
  } else {
    res.status(400).send('Invalid');
  }
});

app.listen(3000, () => console.log('Backend on 3000'));
