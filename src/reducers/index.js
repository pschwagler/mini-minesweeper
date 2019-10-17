import { combineReducers } from 'redux';
import matrixReducer from './matrixReducer.js';
import initializeReducer from './initializeReducer.js';
import timerReducer from './timerReducer.js';
import gameStatusReducer from './gameStatusReducer.js';

export default combineReducers({
  matrix: matrixReducer,
  initialized: initializeReducer,
  startTime: timerReducer,
  gameStatus: gameStatusReducer
});
