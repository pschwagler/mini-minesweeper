const timerReducer = (state = 0, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return action.startTime;
    case 'RESET_TIMER':
      return 0;
    default:
      return state;
  }
};

export default timerReducer;
