import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx';

const Board = ({ matrix }) => {
  // todo... only rerender the specific cell that
  // is updated instead of the entire board
  return (
    <div className='board'>
      {Object.keys(matrix).map(coords => (
        <Cell key={coords} cellData={matrix[coords]} coords={coords} />
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
