const initializeReducer = (state = false, action) => {
  switch (action.type) {
    case 'INITIALIZE_MATRIX':
      return true;
    default:
      return state;
  }
};

export default initializeReducer;
