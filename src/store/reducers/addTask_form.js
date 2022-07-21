const addTask_formReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_ADDTASK":
      return action.payload;
    default:
      return state;
  }
};

export default addTask_formReducer;
