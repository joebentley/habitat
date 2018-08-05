import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
// import Konva from 'konva';

import styled from 'styled-components';

class Player extends React.Component {
  render() {
    return (
      <Rect
        x={this.props.x} y={this.props.y}
        width="40" height="100"
        fill={this.props.color}
        stroke="white"
      />
    );
  }
}

const StyledGameStage = styled.div`
  border-radius: 15px;
  overflow: hidden;
`;

class GameStage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      xPosition: 100,
      xInitial: 0,
      xTarget: 0
    };
  }

  handleClick(e) {
    this.setState(state => {
      clearInterval(this.timer);

      return {
        xInitial: state.xPosition,
        xTarget: e.evt.clientX - 20
      };
    }, () => {
      this.timer = setInterval(() => {
        this.setState(state => {
          return {
            xPosition: state.xPosition + (state.xTarget - state.xInitial) / 50
          };
        });

        if (Math.abs(this.state.xTarget - this.state.xPosition) < 1)
          clearInterval(this.timer);
      }, 10);
    });
  }

  render() {
    const floorLevel = this.props.parentHeight * (3 / 5);

    return (
      <StyledGameStage>
        <Stage
          width={this.props.parentWidth}
          height={this.props.parentHeight}
          onClick={(e) => this.handleClick(e)}
        >
          <Layer>
            <Rect
              fill="blue"
              width={this.props.parentWidth}
              height={this.props.parentHeight}
            />

            <Rect
              fill="green"
              y={floorLevel}
              width={this.props.parentWidth}
              height={this.props.parentHeight}
            />

            <Player
              x={this.state.xPosition}
              y={floorLevel - 90}
              color={this.props.playerColor}
            />
          </Layer>
        </Stage>
      </StyledGameStage>
    );
  }
}

const StyledGameArea = styled.div`
  margin-top: 3px;
  text-align: center;
  background-color: black;
  height: 500px;
  width: 100%;
  min-width: 800px;
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: center;
`;

export default class GameArea extends React.Component {
  render() {
    return (
      <StyledGameArea>
        <GameStage
          parentWidth={this.props.width}
          parentHeight={this.props.height}
          playerColor={this.props.playerColor}
        />
      </StyledGameArea>
    );
  }
}