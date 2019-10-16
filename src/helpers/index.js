const getAdjacents = (row, col) => {
  let adjacentCoords = [];
  adjacentCoords.push('' + (row - 1) + ',' + (col - 1));
  adjacentCoords.push('' + (row - 1) + ',' + col);
  adjacentCoords.push('' + (row - 1) + ',' + (col + 1));
  adjacentCoords.push('' + row + ',' + (col - 1));
  adjacentCoords.push('' + row + ',' + (col + 1));
  adjacentCoords.push('' + (row + 1) + ',' + (col - 1));
  adjacentCoords.push('' + (row + 1) + ',' + col);
  adjacentCoords.push('' + (row + 1) + ',' + (col + 1));
  return adjacentCoords;
};

const helperFxns = {
  createMatrix: n => {
    let matrix = {};
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

  getNumBombs: (state, coords) => {
    const [row, col] = coords.split(',').map(num => +num);

    const checkCoords = getAdjacents(row, col);

    return checkCoords.reduce(
      (numBombs, checkCoord) =>
        state[checkCoord] && state[checkCoord].isBomb ? numBombs + 1 : numBombs,
      0
    );
  },

  partialShuffle: (arr, numItems) => {
    for (let i = 0; i < numItems + 2; i++) {
      let randIndex = Math.floor(Math.random() * arr.length);
      let tmp = arr[i];
      arr[i] = arr[randIndex];
      arr[randIndex] = tmp;
    }
    return arr;
  },

  uncoverCell: (state, currCoords) => {
    if (state[currCoords].isBomb) {
      console.log('game over');
      return (state[currCoords].status = 'BOMBED');
    }

    state[currCoords].status = 'UNCOVERED';

    if (state[currCoords].number === 0) {
      const [row, col] = currCoords.split(',').map(num => +num);
      const adjacentCoords = getAdjacents(row, col);
      if (!state[currCoords].isBomb) {
        for (let coords of adjacentCoords) {
          if (state[coords] && state[coords].status === 'DEFAULT') {
            if (state[coords].number === 0)
              helperFxns.uncoverCell(state, coords);
            else state[coords].status = 'UNCOVERED';
          }
        }
      }
    }
  }
};

export default helperFxns;
