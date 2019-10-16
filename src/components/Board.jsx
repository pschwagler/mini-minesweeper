import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx';

const Board = ({ matrix, startTime }) => {
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
    gameStatus = 'LOST';
  } else if (numUncovered === 100 - 10) {
    gameStatus = 'WON';
  } else {
    gameStatus = 'IN_PROGRESS';
  }

  if (gameStatus === 'LOST' || gameStatus === 'WON') {
    console.log(
      `You ${gameStatus} in ${(Date.now() - startTime) / 1000} seconds`
    );
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
    startTime: state.startTime,
    initialized: state.initialized
  }),
  null
)(Board);
