const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<h1>Hello from Todo App!</h1><p>Dies ist Übung 1.5</p>');
});
server.listen(port, () => {
  console.log('Server started in port ' + port);
});
