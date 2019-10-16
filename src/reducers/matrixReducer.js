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
    case 'INITIALIZE_BOMBS':
      let numBombs = 10;
      for (let coords of Object.keys(state)) {
        newState[coords] = { ...state[coords] };
      }

      let availableCoords = helperFxns.partialShuffle(
        Object.keys(newState),
        numBombs
      );

      for (let i = 0; numBombs !== 0; i++) {
        if (availableCoords[i] !== action.coords) {
          newState[availableCoords[i]].isBomb = true;
          numBombs--;
        }
      }
      for (let coords of Object.keys(newState)) {
        newState[coords].number = helperFxns.getNumBombs(newState, coords);
      }
      helperFxns.uncoverCell(newState, action.coords);
      return newState;
    default:
      return state;
  }
};

export default matrixReducer;
