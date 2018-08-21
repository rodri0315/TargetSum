import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import { Badge, Button } from 'react-native-elements';
import RandomNumber from './RandomNumber';

// Import micro module
import shuffle from 'lodash.shuffle';

export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  }

  gameStatus = 'PLAYING';

  randomNumbers = Array.from({
    length: this.props.randomNumberCount
  }).map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  // TODO: Shuffle the random numbers 
  shuffledRandomNumbers = shuffle(this.randomNumbers);
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return {remainingSeconds: prevState.remainingSeconds - 1};
      }, () => {
        if(this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }
  
  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }
  

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }

  selectNumber = (numberIndex) => {
    return this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  }
  UNSAFE_componentWillUpdate = (nextProps, nextState) => {
    if(
      nextState.selectedIds !== this.state.selectedIds || 
      nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState);
      if(this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }
  
  // gameStatus: PLAYING, WON, LOST
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);

    if(nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    if(sumSelected < this.target) {
      return 'PLAYING';
    }
    if(sumSelected === this.target) {
      return 'WON';
    }
    if(sumSelected > this.target) {
      return 'LOST';
    }
  }
  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Badge
          containerStyle={[styles.target, styles[`STATUS_${gameStatus}`]]}
          value={this.target}
          textStyle={{fontSize: 50, color: 'white',}}
        />
        <View style={styles.ranNumContainer} >
          {
            this.shuffledRandomNumbers.map((randomNumber, index) =>
              <RandomNumber 
                key={index}
                id={index}
                number={randomNumber}
                isDisabled={this.isNumberSelected(index) || gameStatus != 'PLAYING'}
                onPress={this.selectNumber}
              />
            )
          }
        </View>
        <Button 
          title='Play Again'
          onPress={() => {}}
          backgroundColor='orange'
          icon={{name: 'hourglass-start', type: 'font-awesome'}}
        />
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    // justifyContent: 'flex-start',
    backgroundColor: '#ddd',
  },
  target: {
    backgroundColor: 'teal',
    alignItems: 'center',
    margin: 50,
  },
  ranNumContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: 'teal',
  },
  STATUS_WON: {
    backgroundColor: 'lime',
  },
  STATUS_LOST: {
    backgroundColor: 'tomato',
  },
});
