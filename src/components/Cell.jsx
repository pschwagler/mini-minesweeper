import React from 'react';
import { connect } from 'react-redux';
import uncoverCell from '../actions/unCoverCell.js';
import initializeMatrix from '../actions/initializeMatrix.js';
import initializeBombs from '../actions/initializeBombs.js';
import startTimer from '../actions/startTimer.js';

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
    return 'cleared red';
  }
};

const Cell = ({
  cellData,
  coords,
  handleUncoverCell,
  initialized,
  handleInitializeMatrix,
  handleInitializeBombs,
  handleStartTimer,
  gameStatus
}) => {
  console.log(gameStatus);
  if (gameStatus === 'WON') {
    cellData.status = 'UNCOVERED';
    return (
      <div className={generateClass(cellData)}>
        {cellData.isBomb ? (
          <img src='bomb-logo.png' className='cell-img'></img>
        ) : cellData.number === 0 ? (
          ''
        ) : (
          cellData.number
        )}
      </div>
    );
  } else if (gameStatus === 'IN_PROGRESS') {
    if (cellData.status === 'DEFAULT') {
      return (
        <div
          className={generateClass(cellData)}
          onClick={() => {
            if (!initialized) {
              handleInitializeBombs(coords);
              handleInitializeMatrix();
              handleStartTimer();
            } else {
              handleUncoverCell(coords);
            }
          }}
        ></div>
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
  } else if (gameStatus === 'LOST') {
    if (cellData.status === 'BOMBED') {
      return (
        <div className={generateClass(cellData)}>
          <img src='bomb-logo.png' className='cell-img'></img>
        </div>
      );
    } else if (cellData.isBomb) {
      return (
        <div className='cleared'>
          <img src='bomb-logo.png' className='cell-img'></img>
        </div>
      );
    } else {
      cellData.status = 'UNCOVERED';
      return (
        <div className={generateClass(cellData)}>
          {cellData.number === 0 ? '' : cellData.number}
        </div>
      );
    }
  }
};

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords],
    initialized: state.initialized,
    gameStatus: state.gameStatus
  }),
  dispatch => ({
    handleClick: coords => dispatch(uncoverCell(coords)),
    handleInitializeMatrix: () => dispatch(initializeMatrix()),
    handleInitializeBombs: coords => dispatch(initializeBombs(coords)),
    handleUncoverCell: coords => dispatch(uncoverCell(coords)),
    handleStartTimer: () => dispatch(startTimer())
  })
)(Cell);
