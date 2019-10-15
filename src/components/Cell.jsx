import React from 'react';
import { connect } from 'react-redux';
import uncoverCell from '../actions/uncoverCell.js';

const statusToClass = {
  DEFAULT: 'unclicked',
  UNCOVERED: 'cleared'
};

const Cell = ({ cellData, coords, handleClick }) => (
  <div
    className={statusToClass[cellData.status]}
    onClick={() => {
      handleClick(coords);
    }}
  ></div>
);

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords]
  }),
  dispatch => ({
    handleClick: coords => dispatch(uncoverCell(coords))
  })
)(Cell);
