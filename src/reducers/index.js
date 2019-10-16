import { combineReducers } from 'redux';
import matrixReducer from './matrixReducer.js';
import initializeReducer from './initializeReducer.js';
import countReducer from './countReducer.js';

export default combineReducers({
  matrix: matrixReducer,
  initialized: initializeReducer,
  numUncovered: countReducer
});
