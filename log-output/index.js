const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const randomString = crypto.randomBytes(10).toString('hex');
const message = process.env.MESSAGE || "No message from env";
const infoPath = '/usr/src/app/config/information.txt';

// Hilfsfunktion zum Pongs holen (aus 2.1)
const getPongs = () => {
  return new Promise((resolve) => {
    http.get('http://ping-pong-svc:80/pongs', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve('0'));
  });
};

http.createServer(async (req, res) => {
  const fileContent = fs.existsSync(infoPath) ? fs.readFileSync(infoPath, 'utf8') : 'File not found';
  const pongs = await getPongs();
  const timestamp = new Date().toISOString();

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write('file content: ' + fileContent + '\n');
  res.write('env variable: MESSAGE=' + message + '\n');
  res.write(timestamp + ': ' + randomString + '.\n');
  res.write('Pings / Pongs: ' + pongs);
  res.end();
}).listen(3000);
