import React from 'react';
import { StyledTextInput, StyledSubmit } from './misc-styled';
import styled from 'styled-components';

const StyledMessageForm = styled.form`
  margin-top: 1px;
  display: flex;
  position: relative;
  z-index: 1;
`;

const StyledMessageInput = StyledTextInput.extend`
  width: 100%;
`;

export default class NewMessageForm extends React.Component {
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
      <StyledMessageForm>
        <StyledMessageInput
          type="text"
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyPress.bind(this)}
          value={this.state.message}
        />
        <StyledSubmit type="button" value="Send!" onClick={this.handleSend.bind(this)}/>
      </StyledMessageForm>
    );
  }
}