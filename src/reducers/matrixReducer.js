import helperFxns from '../helpers';

const initialState = helperFxns.initializeMatrix(10);

const matrixReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UNCOVER_CELL':
      let newState = {};
      for (let coords of Object.keys(state)) {
        newState[coords] =
          coords !== 'initialized' ? { ...state[coords] } : state.initialized;
        if (coords === action.coords) {
          newState[coords].status = 'UNCOVERED';
        }
      }
      if (!newState.initialized) {
        helperFxns.createBombs(newState, action.coords, 10);
      }
      console.log('initialized board', newState);
      return newState;
    default:
      return state;
  }
};

export default matrixReducer;
