import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx';

const Board = ({ matrix }) => {
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
    matrix: state.matrix
  }),
  null
)(Board);
