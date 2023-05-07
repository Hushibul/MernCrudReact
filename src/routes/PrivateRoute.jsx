import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { storedToken } = useAuth();

  return storedToken !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
