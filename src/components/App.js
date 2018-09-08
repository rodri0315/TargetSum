import React, {Component} from 'react';
import Game from './Game';

export default class App extends Component {
  state = {
    gameId: 1,
  };

  // When this function is called this will unmount Game component and mount a new one.
  resetGame = () => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1};
    });
  };
  render() {
    return (
      <Game
        onPlayAgain={this.resetGame}
        // key will update and react will unmount and mount a new component
        key={this.state.gameId} 
        randomNumberCount={6} 
        initialSeconds={10}/>
    );
  }
}
