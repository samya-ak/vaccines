import React from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

const NavBar: React.FC = () => {
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
			{currentPath.pathname === "/" && <Navigate to="/vaccines" replace={true}/>}
      <div className="container container-md container-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
