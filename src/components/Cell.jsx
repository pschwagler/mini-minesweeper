import React from 'react';
import { connect } from 'react-redux';
import uncoverCell from '../actions/unCoverCell.js';
import flagCell from '../actions/flagCell.js';
import unflagCell from '../actions/unflagCell.js';
import initializeMatrix from '../actions/initializeMatrix.js';
import initializeBombs from '../actions/initializeBombs.js';
import startTimer from '../actions/startTimer.js';

const generateClass = cellData => {
  if (cellData.status === 'DEFAULT' || cellData.status === 'FLAGGED') {
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
  handleFlagCell,
  handleUnflagCell,
  initialized,
  handleInitializeMatrix,
  handleInitializeBombs,
  handleStartTimer,
  gameStatus
}) => {
  // TODO: Make all different types of cells into their own components
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
          onClick={event => {
            if (!initialized) {
              handleInitializeBombs(coords);
              // TODO: change name of initializematrix to something else
              // i.e. markInitialized
              handleInitializeMatrix();
              handleStartTimer();
            } else {
              handleUncoverCell(coords);
            }
          }}
          onContextMenu={event => {
            event.preventDefault();
            handleFlagCell(coords);
          }}
        ></div>
      );
    } else if (cellData.status === 'UNCOVERED') {
      return (
        <div className={generateClass(cellData)}>
          {cellData.number === 0 ? '' : cellData.number}
        </div>
      );
    } else if (cellData.status === 'FLAGGED') {
      return (
        <div
          className={generateClass(cellData)}
          onContextMenu={event => {
            event.preventDefault();
            handleUnflagCell(coords);
          }}
        >
          <img src='flag.png' className='cell-img'></img>
        </div>
      );
    } else if (cellData.status === 'BOMBED') {
      return (
        <div className={generateClass(cellData)}>
          <img src='bomb-logo.png' className='cell-img'></img>
        </div>
      );
    }
  } else if (gameStatus === 'LOSS' || gameStatus === 'WON') {
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
    handleFlagCell: coords => dispatch(flagCell(coords)),
    handleUnflagCell: coords => dispatch(unflagCell(coords)),
    handleStartTimer: () => dispatch(startTimer())
  })
)(Cell);
