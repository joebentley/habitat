const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch(reason => {
    console.error(reason);
    process.exit(-1);
  });

const messageSchema = new mongoose.Schema({
  color: String,
  author: String,
  message: String
});

const Message = mongoose.model('Message', messageSchema);

io.on('connection', socket => {
  let username, color;

  socket.on('set-username-and-color', data => {
    username = data.username;
    color = data.color;
  });

  socket.on('get-messages', () => {
    Message.find((err, messages) => {
      if (err) return console.error(err);
      socket.emit('messages', messages);
    });
  });

  socket.on('new-message', message => {
    if (username != null && color != null && username === message.author && color === message.color) {
      const messageDbItem = new Message({color: message.color, author: message.author, message: message.message});
      messageDbItem.save();
    }
  });
});

http.listen(3000, () => console.log('App listening on port 3000'));
