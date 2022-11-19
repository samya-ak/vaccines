import { combineReducers } from "redux";
import toastReducer from "./toast";
import userReducer from "./user";

export default combineReducers({
  toast: toastReducer,
  user: userReducer,
});
