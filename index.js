const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const messages = [
  {
    'color': 'darkgreen',
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'color': 'darkred',
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  }
];

io.on('connection', socket => {
  let username, color;

  socket.on('set-username-and-color', data => {
    username = data.username;
    color = data.color;
  });

  socket.on('get-messages', () => {
    socket.emit('messages', messages);
  });

  socket.on('new-message', message => {
    if (username != null && color != null && username === message.author && color === message.color)
      messages.push(message);
  });
});

http.listen(3000, () => console.log('App listening on port 3000'));
