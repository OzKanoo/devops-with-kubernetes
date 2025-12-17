const http = require('http');
const axios = require('axios');
// ... (Bild-Logik bleibt gleich wie in 1.12) ...

const getTodos = async () => {
  try {
    const response = await axios.get('http://todo-backend-svc:2345/todos');
    return response.data;
  } catch (e) {
    return ['Backend not reachable'];
  }
};

const server = http.createServer(async (req, res) => {
  // Hier die Bild-Logik einfügen...
  const todos = await getTodos();
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write('<h1>Todo App</h1>');
  res.write('<img src="/image.jpg" width="300" /><br/>');
  res.write('<ul>' + todos.map(t => '<li>' + t + '</li>').join('') + '</ul>');
  res.end();
});
server.listen(3000);
