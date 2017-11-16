var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// serving an html file through node.js
app.get('/', function(req, res){
  // res.send("hello world");
  res.sendFile('/home/rajat/socket'+'/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('typing', function(msg){
    socket.broadcast.emit('typing',msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
