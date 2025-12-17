const http = require('http');
const crypto = require('crypto');
const randomString = crypto.randomBytes(10).toString('hex');

// Hilfsfunktion für den HTTP-Request an die andere App
const getPongs = () => {
  return new Promise((resolve) => {
    // WICHTIG: Wir nutzen den DNS-Namen des Services 'ping-pong-svc'
    http.get('http://ping-pong-svc:80/pongs', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => {
      console.error('Error fetching pongs:', err.message);
      resolve('0');
    });
  });
};

http.createServer(async (req, res) => {
  const pongs = await getPongs();
  const timestamp = new Date().toISOString();
  res.setHeader('Content-Type', 'text/plain');
  res.end(\: \.\nPings / Pongs: \);
}).listen(3000);
