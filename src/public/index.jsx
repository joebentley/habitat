
import * as io from 'socket.io-client';

window.onload = () => {
  let socket = io.connect('localhost:3000');
  socket.emit('hello', 'world', data => {
    console.log(data);
  });
};

const exampleMessages = [
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
      let messageContent = `${message.author}: ${message.message}`;

      return (
        <li key={id} className={'message'} style={{backgroundColor: message.color}}>
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
          className="text-input"
          id="new-message"
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyPress.bind(this)}
          value={this.state.message}
        />
        <input type="button" className="submit-button" value="Send!" onClick={this.handleSend.bind(this)}/>
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

class ColorChooser extends React.Component {
  render() {
    let colorBoxes = this.props.colors.map((color, index) => {
      return (
        <div
          key={index}
          style={{backgroundColor: color}}
          onClick={() => this.props.onClick(index)}
          className={'color-box' + (this.props.chosenIndex === index ? ' color-box-chosen' : '')}
        />
      );
    });

    return (
      <div id="color-box-container">
        {colorBoxes}
      </div>
    );
  }
}

class UsernameModal extends React.Component {
  constructor(props) {
    super(props);

    this.allowedColors = ['darkgreen', 'darkred', 'blue', 'magenta'];

    this.state = {
      username: '',
      chosenColorIndex: 0
    };
  }

  handleChange(e) {
    this.setState({username: e.target.value});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
      e.preventDefault();
    }
  }

  handleSubmit() {
    let username = this.state.username;

    if (username.length === 0)
      return;

    this.setState({username: ''});
    this.props.onSubmit(username, this.allowedColors[this.state.chosenColorIndex]);
  }

  handleColorChange(index) {
    this.setState({chosenColorIndex: index});
  }

  render() {
    return (
      <div id="username-modal">
        <form>
          <div>
            <label htmlFor="username">Enter your username:</label>
            <input
              type="text"
              className="text-input"
              onChange={(e) => this.handleChange(e)}
              onKeyDown={(e) => this.handleKeyPress(e)}
              value={this.state.username}
            />
          </div>
          <ColorChooser
            colors={this.allowedColors}
            chosenIndex={this.state.chosenColorIndex}
            onClick={this.handleColorChange.bind(this)}
          />
          <input type="button" value="Choose!" className="submit-button" onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
    );
  }
}

class StatusBar extends React.Component {
  render() {
    return (
      <div id="status-bar">
        Username: <span style={{color: this.props.color}}>{this.props.username}</span>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.debug ? 'Joe' : null,
      color: 'darkgreen',
      messages: exampleMessages
    };
  }

  handleNewMessage(message) {
    this.setState(state => {
      if (state.username == null)
        return;

      return {
        messages: state.messages.slice().concat({author: state.username, color: state.color, message})
      };
    });
  }

  handleChosenUsernameAndColor(username, color) {
    this.setState({username, color});
  }

  render() {
    return (
      <div id="app">
        {this.state.username == null ? <UsernameModal onSubmit={this.handleChosenUsernameAndColor.bind(this)}/> : null}

        <div id="app-flex">
          <Messages messages={this.state.messages}/>
          <NewMessageForm onClick={(message) => this.handleNewMessage(message)}/>
          <GameArea />
          <StatusBar username={this.state.username} color={this.state.color}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App debug={false}/>, document.getElementById('root'));
