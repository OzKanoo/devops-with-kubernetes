const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Wir nutzen axios für den Download

const port = process.env.PORT || 3000;
const directory = path.join(__dirname, 'files');
const imagePath = path.join(directory, 'image.jpg');

// Funktion zum Herunterladen des Bildes
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
  // 1. Prüfen ob Bild existiert und wie alt es ist
  let shouldFetch = true;
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    const mtime = new Date(stats.mtime).getTime();
    const now = new Date().getTime();
    if (now - mtime < 60 * 60 * 1000) shouldFetch = false; // Jünger als 60 Min
  }

  if (shouldFetch) {
    try { await fetchImage(); } catch (e) { console.error(e); }
  }

  // 2. HTML Antwort senden
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Todo App</h1>');
  res.write('<img src="/image.jpg" width="300" /><br/>');
  res.write('<input type="text" maxlength="140" />');
  res.write('<button>Send</button>');
  res.end();
});

server.listen(port, () => {
  console.log('Server started on port ' + port);
});
