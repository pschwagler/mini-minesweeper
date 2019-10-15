const partialShuffle = (arr, numItems) => {
  for (let i = 0; i < numItems + 2; i++) {
    let randIndex = Math.floor(Math.random() * arr.length);
    let tmp = arr[i];
    arr[i] = arr[randIndex];
    arr[randIndex] = tmp;
  }
  return arr;
};

export default {
  initializeMatrix: n => {
    let matrix = {
      initialized: false
    };
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        matrix['' + row + ',' + col] = { isBomb: false, status: 'DEFAULT' };
      }
    }
    return matrix;
  },

  createBombs: (state, currCoords, numBombs) => {
    let availableCoords = partialShuffle(Object.keys(state), numBombs);

    let i = 0;
    while (numBombs !== 0) {
      if (
        availableCoords[i] !== 'initialized' &&
        availableCoords[i] !== currCoords
      ) {
        state[availableCoords[i]].isBomb = true;
        numBombs--;
      }
      i++;
    }
  }
};
