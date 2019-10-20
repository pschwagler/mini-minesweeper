const generateClass = cellData => {
  if (cellData.status === 'DEFAULT' || cellData.status === 'FLAGGED') {
    return 'unclicked';
  } else if (cellData.status === 'UNCOVERED') {
    if (cellData.number === 0 || cellData.isBomb) {
      return 'cleared';
    } else if (cellData.number === 1) {
      return 'cleared one';
    } else if (cellData.number === 2) {
      return 'cleared two';
    } else if (cellData.number === 3) {
      return 'cleared three';
    } else if (cellData.number === 4) {
      return 'cleared four';
    } else if (cellData.number === 5) {
      return 'cleared five';
    } else if (cellData.number === 6) {
      return 'cleared six';
    } else if (cellData.number === 7) {
      return 'cleared seven';
    } else if (cellData.number === 8) {
      return 'cleared eight';
    }
  } else if (cellData.status === 'BOMBED') {
    return 'cleared red';
  }
};

export default generateClass;
