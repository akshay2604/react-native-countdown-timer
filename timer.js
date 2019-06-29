import React, {Component} from 'react';
import {View, Text, Button, AppState} from 'react-native';

class Timer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      appState: AppState.currentState,
      countdownTimeMin: props.countdownTimeMin,
      currentTime: null,
      backgroundTime: null,
    };
    this.timerRef;
  }
  componentDidMount () {
    this.setTimer (this.state.countdownTimeMin * 60);
    AppState.addEventListener ('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      this.setState ({appState: nextAppState, backgroundTime: Date.now ()});
      console.log (this.state.backgroundTime, 'backgroundTime');
    }
    if (
      this.state.appState.match (/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log ('App has come to the foreground!');
      // resume execution
      const timeResumed = Date.now ();

      const timeInBackground = parseInt (
        (timeResumed - this.state.backgroundTime) / 1000
      );
      if (this.state.currentTime - timeInBackground > 0) {
        // timer has not reached 0 yet
        this.setState ({
          currentTime: this.state.currentTime - timeInBackground,
        });
      } else {
        this.setState ({
          currentTime: 0,
        });
      }
    }
  };

  setTimer (countdownSeconds) {
    this.setState ({currentTime: countdownSeconds});
    this.timerRef = setInterval (this.updateTimer.bind (this), 200);
  }
  stopTimer () {
    clearInterval (this.timerRef);
  }
  updateTimer () {
    console.log (this.state.currentTime, 'this.state.currentTime');
    if (this.state.currentTime <= 0) {
      this.stopTimer ();
    } else {
      this.setState ({currentTime: this.state.currentTime - 1});
    }
  }
  componentWillUnmount () {
    clearInterval (this.timerRef);
    AppState.removeEventListener ('change', this._handleAppStateChange);
  }
  deleteTimer () {
    this.props.onDeletePress (this);
  }
  render () {
    const minutes = parseInt (this.state.currentTime / 60);
    const seconds = this.state.currentTime - minutes * 60;

    return (
      <View style={{flexDirection: 'row'}}>
        <Text>{minutes} Mins {seconds} Seconds </Text>
        <Button title="Delete" onPress={this.deleteTimer.bind (this)} />
      </View>
    );
  }
}
export default Timer;
