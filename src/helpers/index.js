const partialShuffle = (arr, numItems) => {
  for (let i = 0; i < numItems + 2; i++) {
    let randIndex = Math.floor(Math.random() * arr.length);
    let tmp = arr[i];
    arr[i] = arr[randIndex];
    arr[randIndex] = tmp;
  }
  return arr;
};

const getNumBombs = (state, coords) => {
  const [row, col] = coords.split(',').map(num => +num);

  let checkCoords = [];
  checkCoords.push('' + (row - 1) + ',' + (col - 1));
  checkCoords.push('' + (row - 1) + ',' + col);
  checkCoords.push('' + (row - 1) + ',' + (col + 1));
  checkCoords.push('' + row + ',' + (col - 1));
  checkCoords.push('' + row + ',' + (col + 1));
  checkCoords.push('' + (row + 1) + ',' + (col - 1));
  checkCoords.push('' + (row + 1) + ',' + col);
  checkCoords.push('' + (row + 1) + ',' + (col + 1));

  return checkCoords.reduce((numBombs, checkCoord) => {
    state[checkCoord] && state[checkCoord].isBomb && numBombs++;
    return numBombs;
  }, 0);
};

const helperFxns = {
  createMatrix: n => {
    let matrix = {
      initialized: false
    };
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        matrix['' + row + ',' + col] = {
          isBomb: false,
          status: 'DEFAULT',
          number: 0
        };
      }
    }
    return matrix;
  },

  createBombs: (state, currCoords, numBombs) => {
    // TODO: move into intialize function
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

    // assign numbers TODO: move to separate fxn
    for (let key of Object.keys(state)) {
      if (key !== 'initialized') {
        state[key].number = getNumBombs(state, key);
      }
    }

    // make initialized TODO: make part of initialize fxn
    state.initialized = true;

    helperFxns.uncoverCell(state, currCoords);
  },

  uncoverCell: (state, currCoords) => {
    if (state[currCoords].isBomb) {
      console.log('game over');
      return (state[currCoords].status = 'BOMBED');
    }

    state[currCoords].status = 'UNCOVERED';

    if (state[currCoords].number === 0) {
      const adjacentCoords = [];
      const [row, col] = currCoords.split(',').map(num => +num);
      adjacentCoords.push('' + (row - 1) + ',' + col);
      adjacentCoords.push('' + (row + 1) + ',' + col);
      adjacentCoords.push('' + row + ',' + (col - 1));
      adjacentCoords.push('' + row + ',' + (col + 1));

      if (!state[currCoords].isBomb) {
        for (let coords of adjacentCoords) {
          if (
            state[coords] &&
            state[coords].status === 'DEFAULT' &&
            state[coords].number === 0
          ) {
            helperFxns.uncoverCell(state, coords);
          }
        }
      }
    }
  }
};

export default helperFxns;
