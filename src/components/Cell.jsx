import React from 'react';
import { connect } from 'react-redux';
import uncoverCell from '../actions/uncoverCell.js';

const generateClass = cellData => {
  if (cellData.status === 'DEFAULT') {
    return 'unclicked';
  } else if (cellData.status === 'UNCOVERED') {
    if (cellData.number === 0) {
      return 'cleared';
    } else if (cellData.number === 1) {
      return 'cleared one';
    } else if (cellData.number === 2) {
      return 'cleared two';
    } else if (cellData.number === 3) {
      return 'cleared three';
    } else if (cellData.number === 4) {
      return 'cleared four';
    } else if (cellData.number === 5) {
      return 'cleared five';
    } else if (cellData.number === 6) {
      return 'cleared six';
    } else if (cellData.number === 7) {
      return 'cleared seven';
    } else if (cellData.number === 8) {
      return 'cleared eight';
    }
  } else if (cellData.status === 'BOMBED') {
    return 'cleared';
  }
};

const Cell = ({ cellData, coords, handleClick }) => {
  if (cellData.status === 'DEFAULT') {
    return (
      <div
        className={generateClass(cellData)}
        onClick={() => {
          handleClick(coords);
        }}
      >
        {' '}
      </div>
    );
  } else if (cellData.status === 'UNCOVERED') {
    return (
      <div className={generateClass(cellData)}>
        {cellData.number === 0 ? '' : cellData.number}
      </div>
    );
  } else if (cellData.status === 'BOMBED') {
    return (
      <div className={generateClass(cellData)}>
        <img src='bomb-logo.png' className='cell-img'></img>
      </div>
    );
  }
};

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords]
  }),
  dispatch => ({
    handleClick: coords => dispatch(uncoverCell(coords))
  })
)(Cell);
