import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../actions/toast";
import { loginSuccess, loginFail } from "../actions/user";
import { IUser } from "../types";
import { signup, signin } from "../api";
import { useNavigate } from "react-router-dom";
interface IProps {
  type: string;
}

interface IError {
  [field: string]: string;
}

const AuthForm: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { type } = props;
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const [errs, setErrs] = useState<IError>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleInputChanged = (value: string, field: keyof typeof user) => {
    let err = errs;
    setUser((state) => ({ ...state, [field]: value.trim() }));
    delete err[field];
    setErrs(err);
  };

  const hasErrors = (): boolean => {
    let errors: any = {};
    let prop: keyof typeof user;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    for (prop in user) {
      if (user[prop] === "") {
        errors[prop] = `${prop} is required.`;
      }

      if (
        prop === "email" &&
        user[prop].length &&
        !emailRegex.test(user[prop])
      ) {
        errors[prop] = `${user[prop]} is not valid email.`;
      }
    }

    setErrs(errors);
    return Object.keys(errors).length > 0;
  };

  const hideToast = () => {
    setTimeout(() => {
      dispatch(showToast({ type: "success", show: false, message: [] }));
    }, 4000);
  };

  const signupAction = async () => {
    try {
      const res = await signup(user);
      const message = res.message || "Success!";
      dispatch(showToast({ type: "success", show: true, message: [message] }));
    } catch (err: any) {
      const message = err.cause.error.email || "Something went wrong!";
      dispatch(showToast({ type: "danger", show: true, message: [message] }));
    }
  };

  const signinAction = async () => {
    try {
      const res = await signin(user);
      if(localStorage.getItem('user')){
        dispatch(loginSuccess())
        navigate("/vaccines");
      }
    } catch (err: any) {
      const message = err.cause.error || "Something went wrong!";
      dispatch(loginFail())
      dispatch(showToast({ type: "danger", show: true, message: [message] }));
    }
  };

  const submit = async () => {
    if (hasErrors()) {
      return;
    }

    setSubmitting(true);
    switch (type.toLowerCase()) {
      case "signup":
        await signupAction();
        break;
      case "signin":
        await signinAction();
        break;
    }

    setSubmitting(false);
    hideToast();
  };

  useEffect(() => {
    if (Object.keys(errs).length) {
      let message = [] as string[];
      for (const [k, v] of Object.entries(errs)) {
        message.push(v);
      }

      dispatch(showToast({ type: "danger", show: true, message }));
      hideToast();
    }
  }, [errs]);

  return (
    <div className="auth-form d-flex justify-content-center">
      <div className="mt-5">
        <div className="mb-4 row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              onChange={(e) => handleInputChanged(e.target.value, "email")}
              value={user.email}
            />
          </div>
        </div>
        <div className="mb-4 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              onChange={(e) => handleInputChanged(e.target.value, "password")}
              value={user.password}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => submit()}
          disabled={submitting}
        >
          {type.toLowerCase() === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
