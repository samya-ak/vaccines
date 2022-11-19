export const SHOW_TOAST = "SHOW_TOAST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT"
export interface IToast {
  type: "success" | "danger";
  message: string[];
  show: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface ILoginStatus {
  isLoggedIn: boolean;
}

export interface IState {
  toast: IToast;
  user: ILoginStatus;
}

export interface IUser {
  email: string;
  password: string;
}
