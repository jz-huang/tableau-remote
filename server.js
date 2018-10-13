var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var vizSocket;
var remoteSocket;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/remote', function(req, res){
  res.sendFile(__dirname + '/remote.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('connect remote', () => {
    socket.on('next-story', () => {
      console.log('next story request received');
      if (vizSocket) { 
        vizSocket.emit('next-story');
      }
    });
    socket.on('prev-story', () => {
      console.log('prev story request received');
      if (vizSocket) {
        vizSocket.emit('prev-story');
      }
    });
  });

  socket.on('connect viz', () => {
    console.log('attaching viz socket');
    vizSocket = socket;
  })
});

http.listen(port, function(){
  console.log('listening on *:');
});