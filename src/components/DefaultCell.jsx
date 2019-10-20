import React from 'react';
import generateClass from '../helpers/generateClass.js';
import { connect } from 'react-redux';
import uncoverCell from '../actions/unCoverCell.js';
import flagCell from '../actions/flagCell.js';
import initializeMatrix from '../actions/initializeMatrix.js';
import initializeBombs from '../actions/initializeBombs.js';
import startTimer from '../actions/startTimer.js';

const DefaultCell = ({
  cellData,
  coords,
  initialized,
  handleInitializeMatrix,
  handleUncoverCell,
  handleInitializeBombs,
  handleStartTimer,
  handleFlagCell
}) => (
  <div
    className={generateClass(cellData)}
    onClick={() => {
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

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords],
    initialized: state.initialized
  }),
  dispatch => ({
    handleInitializeMatrix: () => dispatch(initializeMatrix()),
    handleInitializeBombs: coords => dispatch(initializeBombs(coords)),
    handleUncoverCell: coords => dispatch(uncoverCell(coords)),
    handleFlagCell: coords => dispatch(flagCell(coords)),
    handleStartTimer: () => dispatch(startTimer())
  })
)(DefaultCell);
