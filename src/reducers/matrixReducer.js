import helperFxns from '../helpers';

const initialState = helperFxns.createMatrix(10);

const matrixReducer = (state = initialState, action) => {
  // must add store initialized into cell functionality and remove from this reducer
  let newState = {};
  switch (action.type) {
    case 'UNCOVER_CELL':
      for (let coords of Object.keys(state)) {
        newState[coords] = { ...state[coords] };
      }
      helperFxns.uncoverCell(newState, action.coords);
      return newState;
    case 'FLAG_CELL':
      for (let coords of Object.keys(state)) {
        newState[coords] = { ...state[coords] };
      }
      newState[action.coords].status = 'FLAGGED';
      return newState;
    case 'UNFLAG_CELL':
      for (let coords of Object.keys(state)) {
        newState[coords] = { ...state[coords] };
      }
      newState[action.coords].status = 'DEFAULT';
      return newState;
    case 'INITIALIZE_BOMBS':
      for (let coords of Object.keys(state)) {
        newState[coords] = { ...state[coords] };
      }
      return helperFxns.placeBombs(newState, action.coords);
    case 'RESTART_MATRIX':
      return initialState;
    default:
      return state;
  }
};

export default matrixReducer;
