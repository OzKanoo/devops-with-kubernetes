const http = require('http');
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect().catch(err => console.error(err));

http.createServer(async (req, res) => {
  if (req.url === '/') { 
    res.end('OK'); // Wichtig für GKE Health Check!
  } else if (req.url === '/pingpong') {
    const result = await client.query('UPDATE pongs SET count = count + 1 WHERE id = 1 RETURNING count');
    res.end('pong ' + (result.rows[0].count - 1));
  } else if (req.url === '/pongs') {
    const result = await client.query('SELECT count FROM pongs WHERE id = 1');
    res.end(result.rows[0].count.toString());
  } else {
    res.statusCode = 404; res.end();
  }
}).listen(3000);
