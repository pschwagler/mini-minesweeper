import React from 'react';
import { connect } from 'react-redux';
import GameOverCell from './GameOverCell.jsx';
import DefaultCell from './DefaultCell.jsx';
import UncoveredCell from './UncoveredCell.jsx';
import FlaggedCell from './FlaggedCell.jsx';
import BombedCell from './BombedCell.jsx';

const Cell = ({ coords, gameStatus, cellData }) => {
  if (cellData.status === 'BOMBED') {
    return <BombedCell coords={coords} />;
  } else if (gameStatus === 'IN_PROGRESS') {
    if (cellData.status === 'DEFAULT') {
      return <DefaultCell coords={coords} />;
    } else if (cellData.status === 'UNCOVERED') {
      return <UncoveredCell coords={coords} />;
    } else if (cellData.status === 'FLAGGED') {
      return <FlaggedCell coords={coords} />;
    }
  } else if (gameStatus === 'WON' || 'LOSS') {
    return <GameOverCell coords={coords} />;
  }
};

export default connect(
  (state, { coords }) => ({
    initialized: state.initialized,
    gameStatus: state.gameStatus,
    cellData: state.matrix[coords]
  }),
  null
)(Cell);
