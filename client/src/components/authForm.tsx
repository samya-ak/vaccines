import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../actions/toast";
interface IProps {
  type: string;
}

interface IUser {
  email: string;
  password: string;
}

interface IError {
  [field: string]: string;
}

const AuthForm: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const { type } = props;
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const [errs, setErrs] = useState<IError>({});

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

  const submit = () => {
    if (hasErrors()) {
      return;
    }
    console.log("user: ", user);
  };

  useEffect(() => {
    if (Object.keys(errs).length) {
      let message = [] as string[];
      for (const [k, v] of Object.entries(errs)) {
        message.push(v);
      }
      console.log("msg", message);
      dispatch(showToast({ type: "danger", show: true, message }));

      setTimeout(()=>{dispatch(showToast({ type: "success", show: false, message:[]}));}, 4000)
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
        >
          {type.toLowerCase() === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
