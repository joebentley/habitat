import React from 'react';
import {animateScroll} from 'react-scroll/modules/index';

export default class MessagesList extends React.Component {
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