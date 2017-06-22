var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var server=require('http').Server(app);
var io=require('socket.io')(server);


var peopleRoute = require('./server/routes/people');
var tariffRoute=require('./server/routes/tariff');
var userRoute=require('./server/routes/user');
var cabRoute=require('./server/routes/cab');




app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/client')));

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/meanapp').then(function(){
  console.log('Database connected');
}).catch(function(e){
  console.log(e);
});

app.use('/', tariffRoute);
app.use('/', cabRoute);
app.use('/', userRoute);

app.use('/api', peopleRoute);
//
io.on('connection',function(socket){
console.log('Socket:',socket.id);
socket.on('getLocation',function(data){
  console.log(data);
  io.sockets.emit('sendLocation',data);
});

});

server.listen(3000,function(req,res){
  console.log('Server is running on port 3000...');
});

//
// app.listen(3000, function(req, res) {
//     console.log('Server is running on port 3000...');
// });
