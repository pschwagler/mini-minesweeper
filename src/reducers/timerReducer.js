const timerReducer = (state = 0, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return action.startTime;
    default:
      return state;
  }
};

export default timerReducer;
