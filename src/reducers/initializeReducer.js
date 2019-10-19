const initializeReducer = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZE_MATRIX':
      return true;
    case 'RESTART_MATRIX':
      return false;
    default:
      return state;
  }
};

export default initializeReducer;
