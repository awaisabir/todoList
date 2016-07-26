var express = require('express');
var app     = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


mongoose.connect('mongodb://127.0.0.1/mytodolist');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.listen(3000);
console.log("No permissions to go to PORT 3000! ;)");


//mongoose model for documents
var Todo = mongoose.model('Todo', {
  text : String
});

//routes:

//getting the todos
app.get('/api/todos', function(req, res) {

  Todo.find(function(err, todoList) {
    if(err)
      res.send(err);

    res.json(todoList);
  });
});


//adding a todo
app.post('/api/todos', function(req, res) {

  Todo.create({
    text  : req.body.text,
    done  : false
  }, function(err, todoList) {
    if(err)
      res.send(err);

    Todo.find(function(err, todoList) {
      if(err)
        res.send(err);

      res.json(todoList);
    });
  });
});


//deleting a todo
app.delete('/api/todos/:todo_id', function(req, res) {

  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todoList) {
    if(err)
      res.send(err);

    Todo.find(function(err, todoList){
      if(err)
        res.send(err);

      res.json(todoList);
    });
  });
});

//default route
app.get('/', function(req, res) {
  res.render('./public/index.html');
});
