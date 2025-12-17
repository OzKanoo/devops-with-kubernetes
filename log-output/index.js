const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const pongPath = path.join(__dirname, 'files', 'pong.txt');
const randomString = crypto.randomBytes(10).toString('hex');

http.createServer((req, res) => {
  const timestamp = new Date().toISOString();
  let pongs = '0';
  if (fs.existsSync(pongPath)) {
    pongs = fs.readFileSync(pongPath, 'utf8');
  }
  res.end(\: \.\nPings / Pongs: \);
}).listen(3000);
