import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
// import Konva from 'konva';

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
      <Stage
        className="game-stage"
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
    );
  }
}

export default class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.div = React.createRef();

    this.state = {
      width: 800,
      height: 500
    };
  }

  render() {
    return (
      <div ref={this.div} id="game-container">
        <GameStage
          parentWidth={this.state.width}
          parentHeight={this.state.height}
          playerColor={this.props.playerColor}
        />
      </div>
    );
  }
}