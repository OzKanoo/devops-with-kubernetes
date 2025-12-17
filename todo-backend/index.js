const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let todos = ['Learn Kubernetes', 'Build a Backend', 'Master Ingress'];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = req.body.todo;
  if (newTodo && newTodo.length <= 140) {
    todos.push(newTodo);
    res.status(201).send('Todo added');
  } else {
    res.status(400).send('Invalid todo');
  }
});

app.listen(port, () => {
  console.log('Todo-Backend started on port ' + port);
});
