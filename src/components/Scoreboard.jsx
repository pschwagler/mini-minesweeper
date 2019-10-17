import React from 'react';
import { connect } from 'react-redux';

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    setInterval(this.tick.bind(this), 100);
    this.state = { seconds: 0 };
  }

  tick() {
    if (this.props.startTime !== 0 && this.props.gameStatus === 'IN_PROGRESS') {
      this.setState({ seconds: (Date.now() - this.props.startTime) / 1000 });
    }
  }

  render() {
    return (
      <div className='score-board-container'>
        <div className='timer'>{this.state.seconds}</div>
        <img src='favicon.ico'></img>
      </div>
    );
  }
}

export default connect(
  state => ({
    startTime: state.startTime,
    gameStatus: state.gameStatus
  }),
  null
)(ScoreBoard);
