
import io from 'socket.io-client';

const socket = io.connect('localhost:3000');

import ReactDOM from 'react-dom';
import React from 'react';

import UsernameModal from './components/username-modal.jsx';
import NewMessageForm from './components/new-message.jsx';
import MessagesList from './components/messages.jsx';

class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.updateCanvas();

    window.onresize = this.updateCanvas.bind(this);
  }

  updateCanvas() {
    const canvas = this.canvas.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');

    ctx.font = '20pt monospace';
    ctx.fillText('PLACEHOLDER', width / 2 - 30, height / 2);
  }

  render() {
    return (
      <div id="canvas-container">
        <canvas ref={this.canvas} id="canvas-area"/>
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
      messages: []
    };
    App.sendUsernameAndColor(this.state.username, this.state.color);
  }

  componentDidMount() {
    socket.on('messages', messages => {
      this.setState({messages});
    });

    socket.emit('get-messages');
  }

  handleNewMessage(message) {
    this.setState(state => {
      if (state.username == null)
        return;

      let newMessage = {author: state.username, color: state.color, message};

      socket.emit('new-message', newMessage);

      return {
        messages: state.messages.slice().concat(newMessage)
      };
    });
  }

  handleChosenUsernameAndColor(username, color) {
    App.sendUsernameAndColor(username, color);
    this.setState({username, color});
  }

  static sendUsernameAndColor(username, color) {
    socket.emit('set-username-and-color', {username, color});
  }

  render() {
    return (
      <div id="app">
        {this.state.username == null ?
          <UsernameModal onSubmit={this.handleChosenUsernameAndColor.bind(this)} />
          : null}

        <div id="app-flex">
          <MessagesList messages={this.state.messages}/>
          <NewMessageForm onClick={(message) => this.handleNewMessage(message)}/>
          <GameArea />
          <StatusBar username={this.state.username} color={this.state.color}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App debug={false}/>, document.getElementById('root'));
