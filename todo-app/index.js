const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 3000;
const directory = path.join(__dirname, 'files');
const imagePath = path.join(directory, 'image.jpg');

const fetchImage = async () => {
  console.log('Fetching a new image...');
  const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(imagePath));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve());
    response.data.on('error', (e) => reject(e));
  });
};

const server = http.createServer(async (req, res) => {
  // 1. Bild-Logik (wie in 1.12)
  let shouldFetch = true;
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    if (new Date().getTime() - new Date(stats.mtime).getTime() < 60 * 60 * 1000) shouldFetch = false;
  }
  if (shouldFetch) { try { await fetchImage(); } catch (e) { console.error(e); } }

  // 2. HTML mit Liste (1.13)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write('<h1>Todo App</h1>');
  res.write('<img src="/image.jpg" width="300" style="margin-bottom: 20px;" /><br/>');
  res.write('<input type="text" maxlength="140" placeholder="New todo" />');
  res.write('<button>Send</button>');
  res.write('<ul>');
  res.write('  <li>Todo 1: Kubernetes lernen</li>');
  res.write('  <li>Todo 2: Ingress konfigurieren</li>');
  res.write('  <li>Todo 3: Feierabend machen</li>');
  res.write('</ul>');
  res.end();
});

server.listen(port, () => {
  console.log('Server started on port ' + port);
});
