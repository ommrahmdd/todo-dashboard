import { legacy_createStore as createStore } from "redux";
import activeCompReducer from "../reducers/activeComp";
import combineReducer from "../reducers/combineReducers";
const store = createStore(combineReducer);
export default store;
