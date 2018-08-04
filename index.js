const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => res.send('Hello, world!'));

io.on('connection', socket => {
  socket.on('hello', (data, callback) => {
    console.log(data);
    callback('handshake');
  });
  console.log('connected');
});

http.listen(3000, () => console.log('App listening on port 3000'));
