const countReducer = (state = 0, action) => {
  switch (action.type) {
    case 'UNCOVER_CELL':
      return state + 1;
    default:
      return state;
  }
};

export default countReducer;
