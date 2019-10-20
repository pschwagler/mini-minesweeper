import React from 'react';
import generateClass from '../helpers/generateClass.js';
import { connect } from 'react-redux';

const GameOverCell = ({ cellData }) => {
  cellData.status = 'UNCOVERED';
  return (
    <div
      className={generateClass(cellData)}
      onContextMenu={event => event.preventDefault()}
    >
      {cellData.isBomb ? (
        <img src='bomb-logo.png' className='cell-img'></img>
      ) : cellData.number === 0 ? (
        ''
      ) : (
        cellData.number
      )}
    </div>
  );
};

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords]
  }),
  null
)(GameOverCell);
