
import * as io from 'socket.io-client';

document.querySelector('#test').innerHTML = 'Hello world!';

window.onload = () => {
  let socket = io.connect('localhost:3000');
  socket.emit('hello', 'world', data => {
    console.log(data);
  });
};