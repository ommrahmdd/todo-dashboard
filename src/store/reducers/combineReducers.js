import { combineReducers } from "redux";
import activeCompReducer from "./activeComp";
import addTask_form from "./addTask_form";
import detailsReducer from "./details_reducer";
export default combineReducers({
  activeCompReducer,
  addTask_form,
  detailsReducer,
});
