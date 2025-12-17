const http = require('http');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:pongs123@postgres-svc:5432/pong_db'
});

// Tabelle beim Start erstellen, falls nicht vorhanden
const initDb = async () => {
  await client.connect();
  await client.query('CREATE TABLE IF NOT EXISTS pongs (id INT PRIMARY KEY, count INT)');
  const res = await client.query('SELECT count FROM pongs WHERE id = 1');
  if (res.rowCount === 0) await client.query('INSERT INTO pongs (id, count) VALUES (1, 0)');
};
initDb().catch(err => console.error('DB Init Error', err));

http.createServer(async (req, res) => {
  if (req.url === '/pingpong') {
    const result = await client.query('UPDATE pongs SET count = count + 1 WHERE id = 1 RETURNING count');
    const count = result.rows[0].count;
    res.end('pong ' + (count - 1));
  } else if (req.url === '/pongs') {
    const result = await client.query('SELECT count FROM pongs WHERE id = 1');
    res.end(result.rows[0].count.toString());
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(3000);
