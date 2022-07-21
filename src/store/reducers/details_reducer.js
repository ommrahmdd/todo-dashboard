let detailsReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default detailsReducer;
