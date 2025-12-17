const http = require('http');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'files', 'pong.txt');

let counter = 0;
// Falls die Datei schon existiert (nach Neustart), Zähler laden
if (fs.existsSync(filePath)) {
  counter = parseInt(fs.readFileSync(filePath, 'utf8')) || 0;
}

http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    counter++;
    fs.writeFileSync(filePath, counter.toString()); // In Datei speichern
    res.end('pong ' + (counter - 1));
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(3000);
