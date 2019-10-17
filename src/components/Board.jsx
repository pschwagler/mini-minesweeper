import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx';
import handleGameInProgress from '../actions/handleGameInProgress.js';
import handleGameLoss from '../actions/handleGameLoss.js';
import handleGameWin from '../actions/handleGameWin.js';

const Board = ({ matrix, handleLoss, handleWin, handleStart }) => {
  let gameStatus = '';
  const numUncovered = Object.values(matrix).reduce((memo, { status }) => {
    if (memo === -1 || status === 'BOMBED') {
      return -1;
    } else if (status === 'UNCOVERED') {
      return memo + 1;
    } else {
      return memo;
    }
  }, 0);
  if (numUncovered === -1) {
    handleLoss();
  } else if (numUncovered === 100 - 10) {
    handleWin();
  } else {
    handleStart();
  }

  return (
    <div className='board'>
      {Object.keys(matrix).map(coords => (
        <Cell
          key={coords}
          cellData={matrix[coords]}
          coords={coords}
          gameStatus={gameStatus}
        />
      ))}
    </div>
  );
};

// export default Todo;
export default connect(
  state => ({
    matrix: state.matrix,
    initialized: state.initialized
  }),
  dispatch => ({
    handleLoss: () => dispatch(handleGameLoss()),
    handleWin: () => dispatch(handleGameWin()),
    handleStart: () => dispatch(handleGameInProgress())
  })
)(Board);
