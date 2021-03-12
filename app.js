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
  socket.username = 'U - ' + (socket.id).toString().substr(1,4);
    socket.broadcast.emit('newUser', socket.username);
    socket.emit('userName', socket.username);
    console.log(socket.username);

    socket.on('change username', (data) => {
      socket.username = data.username;
      console.log(socket.username);
  });

    socket.on('chat message', (msg, username) => {
      console.log(msg, username);
      io.emit('add message', msg, username);
      });

      
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});