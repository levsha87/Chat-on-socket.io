const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(require('express').static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});


io.on('connection', (socket) => {
    socket.username = 'User';
    console.log(socket.username);
    socket.on('chat message', msg => {
    io.emit('chat message', msg);
    });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});