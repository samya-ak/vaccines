import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import {initialState as toast} from "./reducers/toast"

const initialStae = {
	toast
}

export default function configureStore(state = initialStae) {
  return createStore(rootReducer, state);
}
