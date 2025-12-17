const http = require('http');
let counter = 0;
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    res.statusCode = 200;
    res.end('pong ' + counter);
    counter++;
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log('Ping-Pong server started on port ' + port);
});
