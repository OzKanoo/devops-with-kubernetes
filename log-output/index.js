const http = require('http');
const crypto = require('crypto');

const randomString = crypto.randomBytes(10).toString('hex');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(\: \);
});

server.listen(port, () => {
  console.log('Server started in port ' + port);
  
  // Wir behalten die Konsolen-Ausgabe alle 5 Sekunden bei
  setInterval(() => {
    console.log(\: \);
  }, 5000);
});
