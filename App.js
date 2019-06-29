import React, {Component} from 'react';
import {StyleSheet, Text, View, AppState, Button} from 'react-native';
import Timer from './timer.js';
var short = require ('short-uuid');

import _ from 'lodash';

const COUNTDOWN_TIME_MINS = 1;

export default class App extends Component {
  state = {
    timers: [],
  };
  constructor (props) {
    super (props);
    this.timers = [];
  }

  addTimer () {
    console.log ('addTimer');
    const key = short.generate ();
    this.setState ({timers: _.concat (this.state.timers, key)});

    console.log (this.timers);
  }

  onDeletePress (timer) {
    this.setState ({
      timers: this.state.timers.filter (key => key !== timer.props.id),
    });
  }
  render () {
    return (
      <View style={styles.container}>
        {this.state.timers.map (timer => {
          return (
            <Timer
              countdownTimeMin={COUNTDOWN_TIME_MINS}
              key={timer}
              id={timer}
              onDeletePress={timer => this.onDeletePress (timer)}
            />
          );
        })}
        <Button title="Add" onPress={this.addTimer.bind (this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
