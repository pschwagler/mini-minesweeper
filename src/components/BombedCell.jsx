import React from 'react';
import { connect } from 'react-redux';
import generateClass from '../helpers/generateClass.js';

const BombedCell = ({ cellData }) => (
  <div
    className={generateClass(cellData)}
    onContextMenu={event => event.preventDefault()}
  >
    <img src='bomb-logo.png' className='cell-img'></img>
  </div>
);

export default connect(
  (state, { coords }) => ({
    cellData: state.matrix[coords]
  }),
  null
)(BombedCell);
