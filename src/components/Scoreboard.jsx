import React from 'react';
import { connect } from 'react-redux';
import restartMatrix from '../actions/restartMatrix.js';
import resetTimer from '../actions/handleResetTimer.js';

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    setInterval(this.tick.bind(this), 100);
    this.state = { seconds: 0 };
  }

  tick() {
    if (this.props.startTime === 0) {
      this.setState({ seconds: 0 });
    } else if (this.props.gameStatus === 'IN_PROGRESS') {
      this.setState({ seconds: (Date.now() - this.props.startTime) / 1000 });
    }
  }

  render() {
    return (
      <div className='score-board-container'>
        <div className='timer'>{this.state.seconds}</div>
        <img
          onClick={this.props.handleRestart}
          src={
            this.props.gameStatus === 'IN_PROGRESS'
              ? 'start_face.jpg'
              : this.props.gameStatus === 'LOSS'
              ? 'dead_face.jpg'
              : 'win_face.jpg'
          }
          className='smily'
        ></img>
      </div>
    );
  }
}

export default connect(
  state => ({
    startTime: state.startTime,
    gameStatus: state.gameStatus
  }),
  dispatch => ({
    handleRestart: () => {
      dispatch(restartMatrix());
      dispatch(resetTimer());
    }
  })
)(ScoreBoard);
