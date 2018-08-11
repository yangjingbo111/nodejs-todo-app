var express = require('express');
var bodyParser = require('body-parser');

// use local array to papulate the todo list, testing ejs engine
var todos = ['drinking some water', 'play basketball', 'buy some flower'];

var simple = 'hello ejs';



// create express app
var app = express();

// set root folder of static files[serving static files]
app.use(express.static('static'));

// set view engine
app.set('view engine', 'ejs');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// set router
app.get('/', function(req, res){
  // res.sendFile(__dirname + '/todo.html');
  res.render('todo', {data: todos}); // default to views folder
});

//use middle-ware to parse post request
app.post('/', urlencodedParser, function(req, res){
  console.log(req.body.new_item);

  // res.send('you add new item successfully' + req.body.new_item)
  todos.push(req.body.new_item);
  res.render('todo', {data: todos});
});

// just for testing, should be removed when app is completed
app.get('/index', function(req, res){
  res.sendFile(__dirname + '/todo.html')
});

// listen
app.listen(3000);
