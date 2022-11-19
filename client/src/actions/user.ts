import { IAction, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../types"

export const loginSuccess = (): IAction => {
	return {
		type: LOGIN_SUCCESS,
		payload: null
	}
}

export const loginFail = (): IAction => {
	return {
		type: LOGIN_FAIL,
		payload: null
	}
}

export const logout = (): IAction => {
	return {
		type: LOGOUT,
		payload: null
	}
}
