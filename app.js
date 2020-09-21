const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const todoItems = [];

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200);
  res.send('Hello World!');
})

app.get('/items', (req, res) => {
  if(todoItems.length === 0) {
    res.status(200);
    res.send('There are no items in your todo list!');
  } else {
    res.status(200);
    res.send('These are your todo items: ' + todoItems.join(', '));
  }
})

app.post('/items', (req, res) => {
  if (req.body.name === undefined || req.body.name.trim() === "") {
    res.status(400);
    res.send('Item name not valid!');
  } else {
    todoItems.push(req.body.name);
    res.status(200);
    res.send('Item \'' + req.body.name + '\' successfully added!');
  }
})

app.put('/items/:itemId', (req, res) => {
  let itemId = parseInt(req.params.itemId);
  if (isNaN(itemId) || itemId < 0 || itemId >= todoItems.length) {
    res.status(400);
    res.send('Item ID not valid!');
  } else {
    todoItems[itemId] = req.body.name;
    res.status(200);
    res.send('Item \'' + todoItems[itemId] + '\' successfully updated!');
  }
})

app.delete('/items/:itemId', (req, res) => {
  let itemId = parseInt(req.params.itemId);
  if (isNaN(itemId) || itemId < 0 || itemId >= todoItems.length) {
    res.status(400);
    res.send('Item ID not valid!');
  } else {
    let temp = todoItems[itemId];
    todoItems.splice(itemId, 1);
    res.status(200);
    res.send('Item \'' + temp + '\' successfully deleted!');
  }
})

module.exports = app;