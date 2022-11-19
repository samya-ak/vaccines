import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import { initialState as toast } from "./reducers/toast";
import { initialState as user } from "./reducers/user";

const initialStae = {
  toast,
  user,
};

export default function configureStore(state = initialStae) {
  return createStore(rootReducer, state);
}
