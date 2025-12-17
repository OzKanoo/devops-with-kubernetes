const http = require('http');
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect().catch(err => console.error(err));

http.createServer(async (req, res) => {
  // Die App antwortet jetzt nur noch auf dem Root-Pfad /
  if (req.url === '/') {
    const result = await client.query('UPDATE pongs SET count = count + 1 WHERE id = 1 RETURNING count');
    res.end('pong ' + (result.rows[0].count - 1));
  } else {
    res.statusCode = 404; res.end();
  }
}).listen(3000);
