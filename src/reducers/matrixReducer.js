import helperFxns from '../helpers';

const initialState = helperFxns.createMatrix(10);

const matrixReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UNCOVER_CELL':
      let newState = {};
      for (let coords of Object.keys(state)) {
        newState[coords] =
          coords !== 'initialized' ? { ...state[coords] } : state.initialized;
      }
      if (newState.initialized) {
        helperFxns.uncoverCell(newState, action.coords);
      } else {
        helperFxns.createBombs(newState, action.coords, 10);
      }
      return newState;
    default:
      return state;
  }
};

export default matrixReducer;
