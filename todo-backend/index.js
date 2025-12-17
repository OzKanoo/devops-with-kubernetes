const express = require('express');
const { Client } = require('pg');
const app = express();
app.use(express.json());

// Einfaches Middleware-Logging für jede Anfrage
app.use((req, res, next) => {
  console.log([\] \ request to \);
  next();
});

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

const initDb = async () => {
  await client.connect();
  await client.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, todo TEXT)');
};
initDb().catch(err => console.error(err));

app.get('/todos', async (req, res) => {
  const result = await client.query('SELECT todo FROM todos');
  res.json(result.rows.map(r => r.todo));
});

app.post('/todos', async (req, res) => {
  const text = req.body.todo;
  
  // Übung 2.10: Validierung auf 140 Zeichen
  if (text && text.length <= 140) {
    await client.query('INSERT INTO todos (todo) VALUES (\)', [text]);
    console.log(SUCCESS: Added todo: "\");
    res.status(201).send('OK');
  } else {
    // Übung 2.10: Fehlermeldung für die Logs
    console.error(REJECTED: Todo is too long (\ chars). Max 140.);
    res.status(400).send('Todo too long or missing');
  }
});

app.listen(3000, () => console.log('Backend listening on port 3000'));
