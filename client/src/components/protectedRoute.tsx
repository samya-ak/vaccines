import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../types";

const ProtectedRoute = ({ children }: any) => {
  const user = useSelector((state: IState) => state.user);
	
  if (!user.isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
