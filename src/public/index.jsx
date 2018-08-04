
import * as io from 'socket.io-client';

window.onload = () => {
  let socket = io.connect('localhost:3000');
  socket.emit('hello', 'world', data => {
    console.log(data);
  });
};

import ReactDOM from 'react-dom';
import React from 'react';

class Message extends React.Component {
  render() {
    return <p>Message</p>;
  }
}

ReactDOM.render(<Message />, document.getElementById('root'));