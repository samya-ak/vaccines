import React from "react";
interface IProps {
  type: string;
}
const AuthForm: React.FC<IProps> = (props: IProps) => {
  const { type } = props;
  return (
    <div className="auth-form d-flex justify-content-center">
      <div className="mt-5">
        <div className="mb-4 row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputEmail" />
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
            />
          </div>
        </div>
        <button type="button" className="btn btn-primary mt-4">
          {type.toLowerCase() === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
