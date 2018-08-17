import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';


export default class RandomNumber extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  handlePress = () => {
    if (this.props.isDisabled) {
      return;
    }
    this.props.onPress(this.props.id);
  }
  render() {
    // Remember to not have Div's or P tags in React Native
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Badge
          containerStyle={[styles.random, this.props.isDisabled && styles.disabled]}
          value={this.props.number}
          textStyle={[{fontSize: 40, color: 'white'}]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    shadowColor: 'darkgrey',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.7,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    marginVertical: 25,
    marginHorizontal: 15,
    width: 100,
  },
  disabled: {
    opacity: 0.3,
    shadowOffset: {width: 1, height: 2},
  },
});
