import { IAction, IToast, SHOW_TOAST } from "../types";

export const initialState: IToast = {
	type: "success",
	message: [],
	show: false,
}

const toastReducer =  (state=initialState, action: IAction) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
				...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default toastReducer
