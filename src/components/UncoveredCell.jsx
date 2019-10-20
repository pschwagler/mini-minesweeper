import React from 'react';
import { connect } from 'react-redux';
import generateClass from '../helpers/generateClass.js';
import uncoverAdjacents from '../actions/uncoverAdjacents.js';

const UnCoveredCell = ({ coords, cellData, handleUnCoverAdjacents }) => (
  <div
    className={generateClass(cellData)}
    onClick={() => handleUnCoverAdjacents(coords)}
  >
    {cellData.number === 0 ? '' : cellData.number}
  </div>
);

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords]
  }),
  dispatch => ({
    handleUnCoverAdjacents: coords => dispatch(uncoverAdjacents(coords))
  })
)(UnCoveredCell);
