import { IToast, IAction, SHOW_TOAST } from "../types"

export const showToast = (payload: IToast): IAction => {
	return {
		type: SHOW_TOAST,
		payload
	}
}
