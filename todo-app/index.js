const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hello from Todo App\n');
});
server.listen(port, () => {
  console.log('Server started in port ' + port);
});
