import React from 'react';

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

export default class UsernameModal extends React.Component {
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