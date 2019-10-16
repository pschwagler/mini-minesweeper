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

  getNumBombs: (matrix, coords) => {
    const [row, col] = coords.split(',').map(num => +num);

    const checkCoords = getAdjacents(row, col);

    return checkCoords.reduce(
      (numBombs, checkCoord) =>
        matrix[checkCoord] && matrix[checkCoord].isBomb
          ? numBombs + 1
          : numBombs,
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

  uncoverCell: (matrix, currCoords) => {
    if (matrix[currCoords].isBomb) {
      return (matrix[currCoords].status = 'BOMBED');
    }

    matrix[currCoords].status = 'UNCOVERED';

    if (matrix[currCoords].number === 0) {
      const [row, col] = currCoords.split(',').map(num => +num);
      const adjacentCoords = getAdjacents(row, col);
      if (!matrix[currCoords].isBomb) {
        for (let coords of adjacentCoords) {
          if (matrix[coords] && matrix[coords].status === 'DEFAULT') {
            if (matrix[coords].number === 0)
              helperFxns.uncoverCell(matrix, coords);
            else matrix[coords].status = 'UNCOVERED';
          }
        }
      }
    }
  }
};

export default helperFxns;
