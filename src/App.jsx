import React from 'react';
import Board from './components/Board.jsx';
import ScoreBoard from './components/Scoreboard.jsx';
import './App.css';

function App() {
  return (
    <div className='App'>
      <ScoreBoard />
      <Board />
    </div>
  );
}

export default App;

/* 

State {
  N: 10
  cells: [N x N]
      each cell:
      {
        isBomb: false;
        status: DEFAULT, REVEALED, FLAGGED, 
      }
  
}

functions

initialize --> randomly create bombs

handleClick 
- if default
    - if left click
      -- if bomb
        -- end game
      else 
        -- uncover cell
          -- calculate how many bombs are adjacent, display
          -- if no area adjacent, uncover adjacent cells



*/
