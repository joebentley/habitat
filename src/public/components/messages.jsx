import React from 'react';
import {animateScroll} from 'react-scroll/modules/index';
import styled from 'styled-components';

const StyledMessage = styled.li`
  color: ghostwhite;
  padding: 0.2em 0.4em 0.2em 0.4em;
  border-radius: 10px;
  border: solid black 1px;
  background-color: ${props => props.color}
`;

const StyledMessageList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;

  height: 28%;
  z-index: 1;
  position: relative;
  
  overflow: auto;
`;

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
        <StyledMessage key={id} color={message.color}>
          {messageContent}
        </StyledMessage>
      );
    });

    return <StyledMessageList id="messages">{messages}</StyledMessageList>;
  }
}