import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import { Badge } from 'react-native-elements';

export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  randomNumbers = Array.from({
    length: this.props.randomNumberCount
  }).map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  // TODO: Shuffle the random numbers 
  render() {
    return (
      <View style={styles.container}>
        <Badge
          containerStyle={styles.target}
          value={this.target}
          textStyle={{fontSize: 50, color: 'white',}}
        />
        <View style={styles.ranNumContainer} >
          {
            this.randomNumbers.map((randomNumber, index) =>
              <Badge
                key={index}
                containerStyle={styles.random}
                value={randomNumber}
                textStyle={{fontSize: 35, color: 'white'}}
              />
            )
          }
        </View>
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
  random: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    marginVertical: 25,
    marginHorizontal: 15,
    width: 100
  }
});