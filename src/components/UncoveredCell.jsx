import React from 'react';
import { connect } from 'react-redux';
import generateClass from '../helpers/generateClass.js';

const UnCoveredCell = ({ cellData }) => (
  <div className={generateClass(cellData)}>
    {cellData.number === 0 ? '' : cellData.number}
  </div>
);

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords]
  }),
  null
)(UnCoveredCell);
