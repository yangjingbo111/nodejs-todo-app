var express = require('express');

// create express app
var app = express();

// set root folder of static files[serving static files]
app.use(express.static('static'));

// set view engine
app.set('view engine', 'ejs');


// set router
app.get('/', function(req, res){
  // res.sendFile(__dirname + '/todo.html');
  res.render('todo'); // default to views folder
});

app.get('/index', function(req, res){
  res.sendFile(__dirname + '/todo.html')
});

// listen
app.listen(3000);
