import React from 'react';

const interval = 200;

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      isRunning: false,
      timeElapsed: props.initialTime,
    };

    if (props.runOnStart) {
      this.state = {
        isRunning: true,
        timeElapsed: props.initialTime
      };
      this.startTimerInternal();
    }
    else {
      this.state = {
        isRunning: this.initialState.isRunning,
        timeElapsed: this.initialState.timeElapsed
      }
    }
  }

  toggle() {
    this.setState({ isRunning: !this.state.isRunning }, () => {
      this.state.isRunning ? this.startTimerInternal() : this.stopTimerInternal();
    });
  }

  reset() {
    clearTimeout(this.timer);
    this.setState({ isRunning: this.initialState.isRunning, timeElapsed: this.initialState.timeElapsed });
  }

  startTimer() {
    this.setState({ isRunning: true });
    this.startTimerInternal();
  }

  startTimerInternal() {
    this.startTime = Date.now();
    this.timer = setTimeout(this.tick.bind(this), interval);
  }

  stopTimer() {
    this.setState({ isRunning: false });
    this.stopTimerInternal();
  }

  stopTimerInternal() {
    clearTimeout(this.timer);
  }

  tick() {
    if (this.state.isRunning === true && this.state.isMounted === true) {
      this.timer = setTimeout(this.tick.bind(this), interval);
    }
    this.update();
  }

  update() {
    const delta = Date.now() - this.startTime;
    const time = this.state.timeElapsed + delta;
    this.setState({ timeElapsed: time });
    this.startTime = Date.now();
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
    clearTimeout(this.timer);
  }

  render() {
    const { isRunning, timeElapsed } = this.state;
    return (
      <div>
        <TimeElapsed id="timer"
          timeElapsed={this.props.initialTime + timeElapsed}
          initialTime={this.props.initialTime}
          assetsProvider={this.props.assetsProvider} />
      </div>
    );
  }
}

class TimeElapsed extends React.Component {
  getUnits() {
    const seconds = this.props.timeElapsed / 1000 + this.props.initialTime;
    return {
      // min: Math.floor(seconds / 100).toString(),
      sec: Math.floor(seconds).toString(),
      // msec: (seconds % 1).toFixed(3).substring(2)
    };
  }

  render() {
    const units = this.getUnits();
    const left = Math.floor((units.sec % 1000) / 100);
    const center = Math.floor((units.sec % 100) / 10);
    const right = units.sec % 10;

    const leftImgSrc = this.props.assetsProvider.getAsset('../../assets/images/counters/counter' + left + '.gif');
    const centerImgSrc = this.props.assetsProvider.getAsset('../../assets/images/counters/counter' + center + '.gif');
    const rightImgSrc = this.props.assetsProvider.getAsset('../../assets/images/counters/counter' + right + '.gif');
    return (
      <div id={this.props.id}>
        <span className={'counter'}>
          <img src={leftImgSrc} />
        </span>
        <span className={'counter'}>
          <img src={centerImgSrc} />
        </span>
        <span className={'counter'}>
          <img src={rightImgSrc} />
        </span>

      </div>
    );
  }
}

export default Stopwatch;
