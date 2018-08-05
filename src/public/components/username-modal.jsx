import React from 'react';
import styled from 'styled-components';
import { StyledTextInput, StyledSubmit } from './misc-styled.jsx';

const StyledColorBox = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid ${props => props.chosen ? 'white' : 'darkslategrey'};
  background-color: ${props => props.color}
`;

const StyledColorBoxContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-evenly;
`;

class ColorChooser extends React.Component {
  render() {
    let colorBoxes = this.props.colors.map((color, index) => {
      return (
        <StyledColorBox
          key={index}
          color={color}
          chosen={this.props.chosenIndex === index}
          onClick={() => this.props.onClick(index)}
        />
      );
    });

    return (
      <StyledColorBoxContainer>
        {colorBoxes}
      </StyledColorBoxContainer>
    );
  }
}

const StyledUsernameModalSubmit = StyledSubmit.extend`
  margin-top: 1em;
`;

const StyledUsernameModalTextInput = StyledTextInput.extend`
  font-size: 10pt;
`;

const StyledEvenlySpacedFlexDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledUsernameModalForm = styled.form`
  padding: 2em;
  background-color: black;
  text-align: center;
`;

const StyledUsernameModal = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.4);

  padding: 43vh 5em 0 5em;
`;

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
      <StyledUsernameModal>
        <StyledUsernameModalForm>
          <StyledEvenlySpacedFlexDiv>
            <label htmlFor="username">Enter your username:</label>
            <StyledUsernameModalTextInput
              type="text"
              onChange={(e) => this.handleChange(e)}
              onKeyDown={(e) => this.handleKeyPress(e)}
              value={this.state.username}
            />
          </StyledEvenlySpacedFlexDiv>
          <ColorChooser
            colors={this.allowedColors}
            chosenIndex={this.state.chosenColorIndex}
            onClick={this.handleColorChange.bind(this)}
          />
          <StyledUsernameModalSubmit
            type="button"
            value="Choose!"
            onClick={this.handleSubmit.bind(this)} />
        </StyledUsernameModalForm>
      </StyledUsernameModal>
    );
  }
}