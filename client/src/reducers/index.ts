import { combineReducers } from "redux";
import toastReducer from "./toast";
export default combineReducers({
  toast: toastReducer,
});
