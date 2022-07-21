let activeCompReducer = (state = "Platform Launch", action) => {
  switch (action.type) {
    case "SET_ACTIVE_COMP":
      return action.payload;
    default:
      return state;
  }
};
export default activeCompReducer;
