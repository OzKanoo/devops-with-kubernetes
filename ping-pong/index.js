const http = require('http');
let counter = 0;

http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    counter++;
    res.end('pong ' + (counter - 1));
  } else if (req.url === '/pongs') {
    // Dieser Endpunkt ist nur für die Log-App gedacht
    res.end(counter.toString());
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(3000);
