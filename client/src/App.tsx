import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/layout";
import AuthForm from "./components/authForm";
import Vaccines from "./components/vaccines/list";
import VaccineForm from "./components/vaccines/form";
import ProtectedRoute from "./components/protectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "./types";
import { useEffect } from "react";
import { loginSuccess } from "./actions/user";

function NotFound() {
  return (
    <div className="d-flex justify-content-center mt-5 text-muted">
      <h4>404, You're lost :(</h4>
    </div>
  );
}

function App() {
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to same location after page refresh
    if (localStorage.getItem("user")) {
      dispatch(loginSuccess());
      navigate(location)
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="signup"
            element={
              user.isLoggedIn ? (
                <Navigate to="/vaccines" />
              ) : (
                <AuthForm type="signup" />
              )
            }
          />
          <Route
            path="signin"
            element={
              user.isLoggedIn ? (
                <Navigate to="/vaccines" />
              ) : (
                <AuthForm type="signin" />
              )
            }
          />
          <Route
            path="vaccines"
            element={
              <ProtectedRoute>
                <Vaccines />
              </ProtectedRoute>
            }
          />

          <Route
            path="vaccines/create"
            element={
              <ProtectedRoute>
                <VaccineForm type="create"/>
              </ProtectedRoute>
            }
          />
          <Route
            path="vaccines/:id/edit"
            element={
              <ProtectedRoute>
                <VaccineForm type="edit" />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
