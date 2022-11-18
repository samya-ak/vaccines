import React from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../types";

const Layout: React.FC = () => {
  const toast = useSelector((state:IState) => state.toast)
  const currentPath = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand navbar-expand-md navbar-expand-sm bg-light">
        <div className="container container-md container-sm container-fluid">
          <div>
            <Link className="navbar-brand" to="/vaccines">
              Vaccines
            </Link>
          </div>
          <div>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath.pathname === "/signup" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/signup"
                >
                  Sign up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath.pathname === "/signin" ? "active" : ""
                  }`}
                  to="/signin"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {currentPath.pathname === "/" && (
        <Navigate to="/vaccines" replace={true} />
      )}

      <div className="container container-md container-sm">
        <div
          className={`toast position-absolute ${
            toast.show ? "show" : ""
          } text-bg-${toast.type} border-0 mt-3`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              {toast.message.map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
