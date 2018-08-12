var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/my_database',  { useNewUrlParser: true });


mongoose.connection.once('open', function(){
  console.log('connect to database successfully');
});

// define a model
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
  item: String
});

var TodoModel = mongoose.model('Todos', TodoSchema);

// const item = new TodoModel();
// item.item = "sleeping 8 hours";
// item.save(function(err){
//   if (err) throw err;
//   console.log('save item ok: ', item.item);
//
// });

////testing, remove database
// TodoModel.remove({}, function(){
//   console.log("remove database");
// });

// use local array to papulate the todo list, testing ejs engine
var todos = [{item:"test"}];


// create express app
var app = express();

// set root folder of static files[serving static files]
app.use(express.static('static'));

// set view engine
app.set('view engine', 'ejs');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// set router
app.get('/todo', function(req, res){
  // res.sendFile(__dirname + '/todo.html');

  TodoModel.find({}, function (err, docs) {
    if(err) throw err;
    // docs is an array
    res.render('todo', {data: docs}); // default to views folder
  });
});

//use middle-ware to parse post request
app.post('/todo', urlencodedParser, function(req, res){
  // console.log(req.body.new_item);

  // add item to mongoDB
  var item = TodoModel(req.body).save(function(err, docs){
    if (err) throw err;
    res.json(docs);
  });

  // res.send('you add new item successfully' + req.body.new_item)
  // todos.push(req.body.new_item);

});

app.delete('/todo/:item', function(req, res){
  console.log('recv a delete request for:', req.params.item);
  var item = req.params.item;//.replace(/\-/g, " ")
  TodoModel.find({item: item}).remove(function(err, docs){
    if(err) throw err;
    res.json(docs);
  });

  // todos.filter(forEach(function(item){}))
  // res.render('todo', {data: todos});
});

// just for testing, should be removed when app is completed
// app.get('/index', function(req, res){
//   res.sendFile(__dirname + '/todo.html')
// });

// listen
app.listen(3000);
