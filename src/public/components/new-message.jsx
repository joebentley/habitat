import React from 'react';

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