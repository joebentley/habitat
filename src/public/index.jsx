
import io from 'socket.io-client';

const socket = io.connect('localhost:3000');

import ReactDOM from 'react-dom';
import React from 'react';

import UsernameModal from './components/username-modal.jsx';
import NewMessageForm from './components/new-message.jsx';
import MessagesList from './components/messages.jsx';
import GameArea from './components/game-area.jsx';

class StatusBar extends React.Component {
  render() {
    return (
      <div id="status-bar" className="no-select">
        Username:&nbsp;
        <a href="#" style={{color: this.props.color}} onClick={this.props.onNameClick}>
          {this.props.username}
        </a>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.debug ? 'Joe' : localStorage.getItem('username'),
      color: localStorage.getItem('color') || 'darkgreen',
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
    localStorage.setItem('username', username);
    localStorage.setItem('color', color);
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
          <GameArea playerColor={this.state.color}/>
          <StatusBar
            username={this.state.username}
            color={this.state.color}
            onNameClick={() => this.handleChosenUsernameAndColor(null, null)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App debug={false}/>, document.getElementById('root'));
