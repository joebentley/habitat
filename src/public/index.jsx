
import io from 'socket.io-client';

const socket = io.connect('localhost:3000');

import ReactDOM from 'react-dom';
import React from 'react';

import styled, { injectGlobal } from 'styled-components';

import UsernameModal from './components/username-modal.jsx';
import NewMessageForm from './components/new-message.jsx';
import MessagesList from './components/messages.jsx';
import GameArea from './components/game-area.jsx';

injectGlobal`
  body {
    background-color: black;
    color: white;
    font-family: monospace;
    font-size: 12pt;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
`;

const NoSelectDiv = styled.div`
  user-select: none;
`;

const StyledStatusBar = NoSelectDiv.extend`
  font-size: 10pt;
  margin-left: 0.3em;
  margin-top: -0.2em;
`;

class StatusBar extends React.Component {
  render() {
    return (
      <StyledStatusBar>
        Username:&nbsp;
        <a href="#" style={{color: this.props.color}} onClick={this.props.onNameClick}>
          {this.props.username}
        </a>
      </StyledStatusBar>
    );
  }
}

const StyledApp = styled.div`
  height: 100vh;
`;

const StyledAppFlex = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.debug ? 'Joe' : localStorage.getItem('username'),
      color: localStorage.getItem('color') || 'darkgreen',
      xPosition: 0,
      messages: []
    };
  }

  componentDidMount() {
    socket.on('connect', () => {
      socket.emit('get-messages');
      App.sendUsernameAndColor(this.state.username, this.state.color);
      App.sendPosition(this.state.xPosition);
    });

    socket.on('messages', messages => {
      this.setState({messages});
    });
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

  handleChoosingNewUsernameAndColor() {
    this.setState({username: null});
  }

  static sendUsernameAndColor(username, color) {
    socket.emit('set-username-and-color', {username, color});
  }

  static sendPosition(position) {
    socket.emit('set-position', position);
  }

  render() {
    return (
      <StyledApp>
        {this.state.username == null ?
          <UsernameModal onSubmit={this.handleChosenUsernameAndColor.bind(this)} />
          : null}

        <StyledAppFlex>
          <MessagesList messages={this.state.messages}/>
          <NewMessageForm onClick={(message) => this.handleNewMessage(message)}/>
          <GameArea playerColor={this.state.color} width={800} height={500}/>
          <StatusBar
            username={this.state.username}
            color={this.state.color}
            onNameClick={this.handleChoosingNewUsernameAndColor.bind(this)}
          />
        </StyledAppFlex>
      </StyledApp>
    );
  }
}

ReactDOM.render(<App debug={false}/>, document.getElementById('root'));
