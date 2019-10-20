import React from 'react';
import { connect } from 'react-redux';
import generateClass from '../helpers/generateClass.js';
import unflagCell from '../actions/unflagCell.js';

const FlaggedCell = ({ coords, cellData, handleUnflagCell }) => (
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

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords]
  }),
  dispatch => ({
    handleUnflagCell: coords => dispatch(unflagCell(coords))
  })
)(FlaggedCell);
