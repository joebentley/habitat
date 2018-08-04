
import * as io from 'socket.io-client';

window.onload = () => {
  let socket = io.connect('localhost:3000');
  socket.emit('hello', 'world', data => {
    console.log(data);
  });
};

const exampleMessages = [
  {
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  },
  {
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  },
  {
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  },
  {
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  },{
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  },
  {
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  },
  {
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  },
  {
    'author': 'Joe',
    'message': 'Hello Marie!'
  },
  {
    'author': 'Marie',
    'message': 'Hello Joe, how are you?'
  }
];

import ReactDOM from 'react-dom';
import React from 'react';
import {animateScroll} from 'react-scroll';

class Messages extends React.Component {
  componentDidMount() {
    animateScroll.scrollToBottom({containerId: 'messages', duration: 0});
  }

  componentDidUpdate() {
    animateScroll.scrollToBottom({containerId: 'messages', duration: 150});
  }

  render() {
    let messages = this.props.messages.map((message, id) => {
      let messageContent = message.message;
      if (id % 2 === 0) {
        messageContent = `${messageContent} :${message.author}`;
      } else {
        messageContent = `${message.author}: ${messageContent}`;
      }

      return (
        <li key={id} className={'message' + (id % 2 === 0 ? ' message-2' : '')}>
          {messageContent}
        </li>
      );
    });

    return <ol id="messages">{messages}</ol>;
  }
}

class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  handleChange(e) {
    this.setState({message: e.target.value});
  }

  handleSend() {
    let message = this.state.message;

    if (message.length === 0)
      return;

    this.setState({message: ''});
    this.props.onClick(message);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSend();
      e.preventDefault();
    }
  }

  render() {
    return (
      <form id="message-form">
        <input
          type="text"
          id="new-message"
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyPress.bind(this)}
          value={this.state.message}
        />
        <input type="button" id="send-message" value="Send!" onClick={this.handleSend.bind(this)}/>
      </form>
    );
  }
}

class GameArea extends React.Component {
  render() {
    return (
      <div id="canvas-container">
        <canvas id="canvas-area" />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: exampleMessages
    };
  }

  handleNewMessage(message) {
    this.setState(state => {
      return {
        messages: state.messages.slice().concat({author: 'Joe', message})
      };
    });
  }

  render() {
    return (
      <div id="app">
        <Messages messages={this.state.messages}/>
        <NewMessageForm onClick={(message) => this.handleNewMessage(message)}/>
        <GameArea />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
