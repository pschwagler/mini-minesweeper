import { combineReducers } from 'redux';
import matrixReducer from './matrixReducer.js';

export default combineReducers({
  matrix: matrixReducer
});
