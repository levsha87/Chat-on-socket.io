let socket = io.connect('http://localhost:3000');

let messagesAll = document.getElementById('messages');
let messageInputForm = document.getElementById('form_message');
let message = document.getElementById('input_message');

let usernameInputForm = document.getElementById('form_username');
let username = document.getElementById('input_username');

let stateTyping = document.getElementById('state');
const TIME_SHOW_STATE_TYPING = 1000;

const arrBgColor = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light'];

const min = 0;
const max = 6;
let random = Math.floor(Math.random() * (max - min)) + min;

usernameInputForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (username.value) {
    socket.emit('change username', {username: username.value });
  }
});

socket.on('userName', function (userName) {
  console.log('You\'r username is => ' + userName);
});

socket.on('newUser', function (userName) {
  console.log('New user has been connected to chat | ' + userName);
});

messageInputForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (message.value) {
    socket.emit('new message', {msg: message.value, username : username.value, bgColor: arrBgColor[random]});
    message.value = '';
  }
});

socket.on('add message', function (data) {
  let item = document.createElement('li');
  item.classList.add(`bg-${data.bgColor}`);
  item.textContent = data.username + ' : ' + data.msg + '\n';
  messagesAll.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

message.addEventListener('keypress', function () {
  socket.emit('typing');
});

socket.on('typing', function (data) {
  stateTyping.innerHTML =
    '<p><em>' + data.username + ' is typing a message...</em></p>';
});

socket.on('!typing', function (data) {
  setTimeout(() => {
    stateTyping.innerHTML = '';
  }, TIME_SHOW_STATE_TYPING);
});
