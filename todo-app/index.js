const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 3000;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001/todos';
const directory = path.join(__dirname, 'files');
const imagePath = path.join(directory, 'image.jpg');

const fetchImage = async () => {
  const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(imagePath));
  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve());
    response.data.on('error', (e) => reject(e));
  });
};

const server = http.createServer(async (req, res) => {
  // Bild-Logik
  if (!fs.existsSync(imagePath)) await fetchImage();

  // Todos vom Backend holen
  let todos = [];
  try {
    const response = await axios.get(backendUrl);
    todos = response.data;
  } catch (e) {
    console.error('Backend unreachable at ' + backendUrl);
    todos = ['Backend error'];
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write('<h1>Todo App</h1>');
  res.write('<img src="/image.jpg" width="300" /><br/>');
  res.write('<ul>' + todos.map(t => '<li>' + t + '</li>').join('') + '</ul>');
  res.end();
});

server.listen(port, () => console.log('Frontend started on port ' + port));
