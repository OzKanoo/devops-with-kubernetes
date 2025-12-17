const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const filePath = path.join(__dirname, 'files', 'log.txt');
const randomString = crypto.randomBytes(10).toString('hex');
const mode = process.env.MODE || 'WRITE'; // Wir nutzen eine Umgebungsvariable

if (mode === 'WRITE') {
  console.log('Starting in WRITE mode...');
  // Alle 5 Sekunden Zeitstempel in die Datei schreiben
  setInterval(() => {
    const logLine = \: \\n;
    fs.appendFileSync(filePath, logLine);
    console.log('Wrote to file: ' + logLine);
  }, 5000);
} else {
  console.log('Starting in READ mode...');
  // Webserver, der die Datei ausliest
  http.createServer((req, res) => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      res.end(content);
    } else {
      res.end('File not found yet...');
    }
  }).listen(3000);
}
