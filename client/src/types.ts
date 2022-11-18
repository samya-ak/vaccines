export const SHOW_TOAST = "SHOW_TOAST";
export interface IToast {
  type: "success" | "danger";
  message: string[];
	show: boolean;
}

export interface IAction {
  type: string;
  payload: Object;
}

export interface IState {
	toast: IToast
}
