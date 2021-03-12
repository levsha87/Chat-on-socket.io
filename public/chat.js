let socket = io.connect();

      let messagesAll = document.getElementById('messages');
      let messageInputForm = document.getElementById('form_message');
      let message = document.getElementById('input_message');

      let usernameInputForm = document.getElementById('form_username');
      let username = document.getElementById('input_username');

      messageInputForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (message.value) {
          socket.emit('chat message', message.value);
          message.value = '';
        }
      });

      socket.on('add message', function(msg, username) {
        let item = document.createElement('li');
        item.textContent = username + ' : '+ msg +'\n';
        messagesAll.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      });

      buttonSendUserName.addEventListener('click', function(e) {
        if (username.value) {
          socket.emit('change username', {username: username.value});
        }
      });

      socket.on('userName', function(userName){
        console.log('You\'r username is => ' + userName);
    });
      
    socket.on('newUser', function(userName){
        console.log('New user has been connected to chat | ' + userName);
    });

      

     

     