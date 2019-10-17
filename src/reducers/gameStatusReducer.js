const gameStatusReducer = (state = '', action) => {
  switch (action.type) {
    case 'GAME_STATUS_IN_PROGRESS':
      return 'IN_PROGRESS';
    case 'GAME_STATUS_LOSS':
      return 'LOSS';
    case 'GAME_STATUS_WIN':
      return 'WON';
    default:
      return state;
  }
};

export default gameStatusReducer;
