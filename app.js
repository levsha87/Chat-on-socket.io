const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(require('express').static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});


io.on('connection', (socket) => {
    
    socket.on('change username', (data) => {
      socket.username = data.username;
      socket.emit('userName', socket.username);
      socket.broadcast.emit('newUser', socket.username);
    });

    socket.on('new message', (data) => {
      console.log(data.msg, data.username);
      io.emit('add message', {msg: data.msg, username:  data.username, bgColor: data.bgColor});
      });

      socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username});
      });
      
      socket.on('typing', (data) => {
        socket.broadcast.emit('!typing', {username : socket.username});
      });
      
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});